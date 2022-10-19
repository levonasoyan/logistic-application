import express from "express";
import { getLoads, postLoad,getSingleLoad, editLoad, calcelLoad } from "../controllers/loadsController";

const router = express.Router();


router.get("/", getLoads);

router.get("/:id", getSingleLoad);

router.post("/", postLoad);

router.delete("/:id", calcelLoad);

router.put("/:id", editLoad);


module.exports = router;
