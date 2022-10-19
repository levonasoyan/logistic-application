import { Request, Response } from "express";
import { shipperQuery, vendorQuery } from "../constants/otherQueries";
import { getQueryToClient } from "../api/generalClientQueries";

export const getCountries = async (req: Request, res: Response) => {
    const query = 'SELECT * FROM country';
    getQueryToClient(query, [], res);
};

export const getShippers = async (req: Request, res: Response) => {
  const { name } = req.query;
  const query = shipperQuery + ` WHERE sh.name iLike $1 LIMIT 100`;
  const params = [`%${name}%`]
  getQueryToClient(query, params, res);
};

export const getVendors = async (req: Request, res: Response) => {
  const { name } = req.query;
  const query = vendorQuery + ` WHERE v.name iLike $1 LIMIT 100`;
  const params = [`%${name}%`]
  getQueryToClient(query, params, res);
};

export const getCurrencies = async (req: Request, res: Response) => {
  const query = 'SELECT * FROM curr ORDER BY rn ASC';
  getQueryToClient(query, [], res);
};