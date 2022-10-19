import { getClient } from "../config/db";
import { catchAction } from '../common/errorHandler';
import { Response } from "express";

export const getQueryToClient = async(query: string, params: any[], res: Response, 
    singleData: boolean = false, returnData: boolean = false) => {
      
    const client = getClient();
    try {
      await client.connect();
      const data = await client.query(query, params);
      const resData = singleData ? data.rows[0] : data.rows;
      if(returnData){
        return resData;
      }
      else{
        res.json(resData);
      }
    } 
    catch (err) {
        if(returnData){
          return null;
        }
        else{
          catchAction(err, res, 400);
        }
    } 
    finally {
      client.end();
    }
}
