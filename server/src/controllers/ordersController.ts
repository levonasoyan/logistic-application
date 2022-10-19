import { Request, Response } from "express";
import moment from 'moment';
import { insertQueryParams, updateQueryParams } from "../common/queryMaker";
import { getSingleOrderQuery, orderQuery } from "../constants/orderQueries";
import { getQueryToClient } from "../api/generalClientQueries";
import { downloadPdf, deleteOrderToClient, postOrEditOrderToClient } from "../api/orderClientQueries";
import { deleteBulkLoadsOrderIdQuery, updateBulkLoadsOrderIdQuery } from "../constants/loadQueries";
import { FetchedOrderForPrint } from "../types";
import { setOrderNumber } from "../api/otherApi";
import dotenv from 'dotenv';
import { getClient } from "../config/db";
import { catchAction } from "../common/errorHandler";
import pg from 'pg'


dotenv.config();
const baseURL = process.env.BASE_URL

// Returning pg date type with valid dat
pg.types.setTypeParser( 1082, 'text',( order_date ) =>  new Date(order_date));

export const getOrders = (req: Request, res: Response) => {
  const { order_number, status }= req.query;
  let query = orderQuery;
  const params: any[] = [];
  
  if(order_number){
    query += ' WHERE order_number iLike  $1';
    params.push(`%${order_number}%`);
  }
  else if(status === 'normal'){
    query += ' WHERE canceled = false';
  }
  else if(status === 'canceled'){
    query += ' WHERE canceled = true';
  }
  getQueryToClient(query, params, res);
};


export const getSingleOrder = (req: Request, res: Response,) => {
  const { id } = req.params;
  const query = getSingleOrderQuery('get') + ' WHERE fto.id = $1';
  getQueryToClient(query, [id], res, true);
};


export const postOrder = async (req: Request, res: Response) => {
  const client = getClient();
  try{
    await client.connect();
    await client.query("BEGIN");
    const { orderDetails, loadIdList } = req.body;
    const order_date = moment().format('YYYY-MM-DD')
    const database: any = req.headers.database
    const { query, params } = insertQueryParams({ ...orderDetails, order_date  }, 'fms_tt_orders');
    const initLoadQuery = updateBulkLoadsOrderIdQuery;
    const orderData  = await postOrEditOrderToClient(query, params, initLoadQuery, loadIdList, client);
    await client.query("COMMIT") 
    await setOrderNumber( database, baseURL, orderData.id, order_date );
    const singleOrderQuery = getSingleOrderQuery('get') + ' WHERE fto.id = $1';
    const postedOrder = await client.query(singleOrderQuery, [orderData.id]);
    res.json(postedOrder.rows[0]);
  }

  catch (err) { 
    console.log(err);      
    catchAction(err, res, 400);
    await client.query("ROLLBACK");
  } 
  finally {
    client.end();
  }
};

export const calcelOrder = (req: Request, res: Response,) => {
  const { id } = req.params;
  const { cancel_reason } = req.query;
  const query = 'UPDATE fms_tt_orders SET canceled = true, cancel_reason = $1 WHERE id = $2 RETURNING*';
  getQueryToClient(query, [cancel_reason, id], res, true);
};

export const editOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { orderDetails, loadIdList } = req.body;
    const { query, params } = updateQueryParams(orderDetails, id, 'fms_tt_orders');
    const client = getClient();
    try{
      await client.connect();
      await client.query("BEGIN");
      const initLoadQuery = updateBulkLoadsOrderIdQuery;
      const orderData = await postOrEditOrderToClient(query, params, initLoadQuery, loadIdList, client);
      const singleOrderQuery = getSingleOrderQuery('get') + ' WHERE fto.id = $1';
      const editedOrder = await client.query(singleOrderQuery, [orderData.id]);
      res.json(editedOrder.rows[0]);
      await client.query("COMMIT");
    
    }

    catch (err) {
      console.log(err);      
      catchAction(err, res, 400);
      await client.query("ROLLBACK");
    } 
    finally {
      client.end();
    }
};

export const printOrder = async(req: Request, res: Response) => {
  const { id } = req.params;
  const { checked } = req.query;
  const query = getSingleOrderQuery('print') + ' WHERE fto.id = $1';
  const orderDetails: FetchedOrderForPrint = await getQueryToClient(query, [id], res, true, true);
  downloadPdf(orderDetails, res, (checked === 'false' ? false : true));
}
