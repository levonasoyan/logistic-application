import { Response } from "express";
import { getClient } from "../config/db";
import { catchAction } from '../common/errorHandler';


export const postOrEditLoadToClient = async(query1: string, params1: any[], client:any, query2: string, params2: any[]) => {
  
     // insert or update fms_tt_load table
    const loadData = await client.query(query1, params1);
    const { id } = loadData.rows[0];
    // insert or update fms_tt_load table fms_tt_load_details
    await client.query(query2, [...params2, id]);
    await client.query("COMMIT");
    return loadData.rows[0];
   
  
}

export const deleteLoadToClient = async(query1: string, id: number, query2: string, res: Response) => {
  const client = getClient();
  try {
    await client.connect();
    await client.query("BEGIN");
    // delete from fms_tt_load_details
    await client.query(query1, [id]);
    // delete from fms_tt_load table
    const loadData = await client.query(query2, [id]);
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
