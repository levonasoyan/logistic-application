import express from "express";
import { calcelOrder, editOrder, getOrders, getSingleOrder, postOrder, printOrder } from "../controllers/ordersController";

const router = express.Router();


router.get("/", getOrders);

router.get("/print/:id", printOrder);

router.get("/:id", getSingleOrder);

router.post("/", postOrder);

router.delete("/:id", calcelOrder);

router.put("/:id", editOrder);


module.exports = router;
