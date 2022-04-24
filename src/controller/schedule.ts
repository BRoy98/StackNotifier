import NotificationScheduler from "../scheduler";
import Notifier from "../notifier";

const scheduler = new NotificationScheduler().instance;
const notifier = new Notifier();

const sendToTopic = async (req, res, next) => {
  try {
    const { body } = req;
    const { topic, messages } = body;
    const messageData = JSON.parse(messages);

    await scheduler.scheduleNotification({
      messageData,
      topic,
    });

    return res.send("Notification scheduled!");
  } catch (err) {
    console.log("error.failed-to-send-notification", err.message);
    next(err);
  }
};

const send = async (req, res, next) => {
  try {
    const { body } = req;
    const { service, to, message } = body;

    const result = await notifier.notify(service, {
      to,
      message,
    });

    // console.log("result", result);

    if (!result) return res.status(400).send(`Failed to send notification`);

    return res.send("Notification scheduled!");
  } catch (err) {
    // console.log("error.failed-to-send-notification", err.message);
    next(err);
  }
};

export default { send, sendToTopic };
