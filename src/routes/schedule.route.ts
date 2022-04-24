import express from "express";
import { sendValidator, sendToTopicValidator } from "./validator";
import scheduleController from "../controller/schedule";

const router = express.Router();

/* Send an ad-hoc notification */
router.post(
  "/sendToTopic",
  sendToTopicValidator(),
  scheduleController.sendToTopic
);

/* Send an ad-hoc notification */
router.post("/send", sendValidator(), scheduleController.send);

export default router;
