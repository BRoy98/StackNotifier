import express from "express";
import scheduleController from "../controller/schedule";

const router = express.Router();

/* Send an ad-hoc notification */
router.post("/send", scheduleController.send);

export default router;
