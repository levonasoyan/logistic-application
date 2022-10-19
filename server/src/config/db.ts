import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();

let client:any = null;
const port = Number(process.env.DB_PORT);

export const createClient = (database:string)=>{
      client = new Client({
        user: process.env.DB_USER,
        password:  process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port,
        database
    });
   
}

export const getClient = ()=>{
    return client;
} 
