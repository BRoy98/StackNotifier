import express from "express";
import NotificationScheduler from "../scheduler";
import Notifier from "../notifier";
import { validationResult } from "express-validator";

const scheduler = new NotificationScheduler().instance;
const notifier = new Notifier();

const sendToTopic = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "fail",
      errors: errors.array(),
    });
  }

  try {
    const { body } = req;
    const { topic, messages } = body;
    const messageData = JSON.parse(messages);

    await scheduler.scheduleNotification({
      messageData,
      topic,
    });

    return res.json({
      status: "success",
      message: "Notification scheduled!",
    });
  } catch (err) {
    console.log("error.failed-to-send-notification", err.message);
    next(err);
  }
};

const send = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "fail",
      errors: errors.array(),
    });
  }

  try {
    const { body } = req;
    const { service, to, message } = body;

    const result = await notifier.notify(service, {
      to,
      message,
    });

    if (!result)
      return res.status(400).json({
        status: "fail",
        message: "Failed to send notification",
      });

    return res.json({
      status: "success",
      message: "Notification sent!",
    });
  } catch (err) {
    // console.log("error.failed-to-send-notification", err.message);
    next(err);
  }
};

export default { send, sendToTopic };
