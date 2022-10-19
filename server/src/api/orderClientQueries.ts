import { getClient } from "../config/db";
import { catchAction } from '../common/errorHandler';
import { Response } from "express";
import format from 'pg-format';
import fs from 'fs';
import path from 'path';
import { FetchedOrderForPrint } from "../types";
import { getHtmlTemplate } from "../documents/createTemplate";
const html_to_pdf = require('html-pdf-node');

export const postOrEditOrderToClient = async(query1: string, params1: any[], initLoadsQuery: string, loadIdList: number[], client: any) => {

    const editAction = query1.includes('UPDATE');
      // insert or update fms_tt_orders table
      const loadData = await client.query(query1, params1);
      const { id }= loadData.rows[0];

      // delete any prev loads fom order if editing
      if(editAction){
        const deleteLoadOrderIdQuery = `UPDATE fms_tt_load SET order_id = $1 WHERE order_id = $2`
        const deleteLoadOrderIdParams = [null, id];
        await client.query(deleteLoadOrderIdQuery, deleteLoadOrderIdParams);
      }
      // update fms_tt_load table and add load_id
     if(loadIdList.length){
      const loadBlukQuery = format(initLoadsQuery, id, loadIdList);
      await client.query(loadBlukQuery);
     }
      return loadData.rows[0] 
  }

  export const deleteOrderToClient = async(query: string, id: string, loadsQuery: string, res: Response) => {
    const client = getClient();
    try {
      await client.connect();
      await client.query("BEGIN");
      // update fms_tt_load table and remove load_id
      await client.query(loadsQuery, [null, id]);
      // delete from fms_tt_orders table
      const loadData = await client.query(query, [id]);
      await client.query("COMMIT");
      res.json(loadData.rows[0]);
    } 
    catch (err) {
      catchAction(err, res, 400);
      await client.query("ROLLBACK");
    } 
    finally {
      client.end();
    }
  }

export const downloadPdf = async(orderDetails: FetchedOrderForPrint, res: any, checked:boolean) => {
  try{
    // create a PDF file and save the file on server
    const template = getHtmlTemplate(orderDetails, checked);
    const options = { format: 'A4', printBackground: true, displayHeaderFooter: true};
    const file = { content: template  };
    const fileName = `order_${new Date().toDateString()}.pdf`;
    const pdfBuffer = await html_to_pdf.generatePdf(file, options );
    const printDir = process.env.PRINT_DIR;
    fs.writeFileSync(printDir + fileName, pdfBuffer);
    // send file to client and delete it from server
    let root = '';
    if(process.env.NODE_ENV === "production"){
      root = printDir || "/tmp/";
    }
    else{
      root = path.join(__dirname, '../../');
    } 
    const resOptions = { root };
    res.status(201).sendFile(fileName, resOptions, (err: any) => {
      if(err){
        catchAction(err, res, 400);
      }
      else{
        fs.unlinkSync(path.join(root, fileName));
      }
    });
  }
  catch (err) {
    catchAction(err, res, 400);
  } 
}
