import NotificationScheduler from "../scheduler";
import Notifier from "../notifier";

const scheduler = new NotificationScheduler().instance;
const notifier = new Notifier();

const add = (req, res, next) => {
  const { body } = req;
  const { title, message, date } = body;

  console.log(body);
  try {
    scheduler.sendNotification({
      services: ["sms"],
    });
  } catch (err) {
    console.error(`Error scheduling notification`, err.message);
    next(err);
  }
};

const list = (req, res, next) => {
  try {
  } catch (err) {
    console.error(`Error scheduling notification`, err.message);
    next(err);
  }
};

const dl = async (req, res, next) => {
  try {
    res.json(await "");
  } catch (err) {
    console.error(`Error scheduling notification`, err.message);
    next(err);
  }
};

const send = async (req, res, next) => {
  try {
    const { body } = req;
    const services = body.services.split(",");
    const subscriptions = body.subscriptions.split(",");
    const message = body.message;

    const result = await notifier.notify(services, {
      to: "+19403145868",
      message: "Hello World",
    });

    console.log("result", result);

    res.send("Notification scheduled!");
  } catch (err) {
    console.log("error.failed-to-send-notification", err.message);
    next(err);
  }
};

export default { add, list, dl, send };
