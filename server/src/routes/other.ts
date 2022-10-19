import express from "express";
import { getCountries, getCurrencies, getShippers, getVendors } from '../controllers/otherController';

const router = express.Router();

router.get("/countries", getCountries);

router.get("/shippers", getShippers);

router.get("/vendors", getVendors);

router.get("/currencies", getCurrencies);

module.exports = router;
