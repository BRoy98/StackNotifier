import express from "express";
import scheduleController from "../controller/schedule";

const router = express.Router();

/* Schedule a notification */
router.post("/schedule", scheduleController.add);

/* Get scheduled notification */
router.get("/list-schedule", scheduleController.list);

/* Delete scheduled notification */
router.post("/del-schedule", scheduleController.dl);

/* Send an ad-hoc notification */
router.post("/send", scheduleController.send);

export default router;
