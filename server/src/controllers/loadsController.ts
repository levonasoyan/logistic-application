import { Request, Response } from "express";
import moment from 'moment';
import { loadQuery, singleLoadQuery } from "../constants/loadQueries";
import { insertQueryParams, updateQueryParams } from "../common/queryMaker";
import { postOrEditLoadToClient } from '../api/loadClientQueries';
import { getQueryToClient } from "../api/generalClientQueries";
import { setLoadNumber } from "../api/otherApi";
import dotenv from 'dotenv';
import { getClient } from "../config/db";
import { catchAction } from "../common/errorHandler";
import { loadFilterQueryParams } from '../helper/helper';

dotenv.config();
const baseURL = process.env.BASE_URL


export const getLoads = (req: Request, res: Response) => {
  const { query, params } = loadFilterQueryParams(req.query, loadQuery)
  getQueryToClient(query, params, res);
};


export const getSingleLoad = (req: Request, res: Response,) => {
  const { id } = req.params;
  const { job_number }= req.query;
  if(job_number){
    const query = singleLoadQuery + ' WHERE job_number = $1';
    getQueryToClient(query, [job_number], res, true);
  }
  else{
    const query = singleLoadQuery + ' WHERE ftl.id = $1';
    getQueryToClient(query, [id], res, true);
  }
};


export const postLoad = async (req: Request, res: Response) => {
  const client = getClient();
  try{
    await client.connect();
    await client.query("BEGIN");
    const { loadDetails } = req.body;
    const database: any = req.headers.database
    const created_on = moment().format('YYYY-MM-DD'); 
    const { query, params } = insertQueryParams({ ...loadDetails,created_on }, 'fms_tt_load');
    const detailsQuery = `INSERT INTO fms_tt_load_details (load_details, load_id) VALUES ($1, $2)`;
    const detailsParams = [req.body];
    const loadData = await postOrEditLoadToClient(query, params,client, detailsQuery, detailsParams);
    await client.query("COMMIT");
    await setLoadNumber(database,baseURL,loadData.id,created_on);
    const postedLoadQuery = singleLoadQuery + ' WHERE ftl.id = $1';
    const postedLoad = await client.query(postedLoadQuery, [loadData.id])
    res.json(postedLoad.rows[0])
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

export const calcelLoad = (req: Request, res: Response,) => {
  const { id } = req.params;
  const { cancel_reason } = req.query;
  const query = 'UPDATE fms_tt_load SET canceled = true, cancel_reason = $1 WHERE id = $2 RETURNING*';
  getQueryToClient(query, [cancel_reason, id], res, true);
};

export const editLoad = async (req: Request, res: Response) => {
  const client = getClient();
  try{
    await client.connect();
    await client.query("BEGIN");
    const { id } = req.params;
    const { loadDetails } = req.body;
    const updated_on = moment().format('YYYY-MM-DD');
    const { query, params } = updateQueryParams({ ...loadDetails, updated_on }, id, 'fms_tt_load');
    const detailsQuery = `UPDATE fms_tt_load_details SET load_details = $1 WHERE load_id = $2`;
    const detailsParams = [req.body];
    const loadData = await postOrEditLoadToClient(query, params,client, detailsQuery, detailsParams);
    const editedLoadQuery = singleLoadQuery + ' WHERE ftl.id = $1';
    const editedLoad = await client.query(editedLoadQuery, [loadData.id])
    res.json(editedLoad.rows[0]);
    await client.query("COMMIT");

  }catch (err) {
    console.log(err);      
    catchAction(err, res, 400);
    await client.query("ROLLBACK");
  } 
  finally {
    client.end();
  }

};
