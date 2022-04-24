require("dotenv").config();
import express from "express";
import scheduleRoute from "./src/routes/schedule.route";
import weatherSchedule from "@schedules/weather-report";

// schedules a weather report notification every 5 minutes
if (process.env.RUN_WEATHER_NOTIFIER === "true")
  weatherSchedule("*/30 * * * * *");

// initialize the express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mount the routes
app.use("/notifier", scheduleRoute);

app.use((err, req, res, next) => {
  return res.status(400).json({
    status: "fail",
    message: err.message,
  });
});

// start the server
const port = process.env.PORT || 3030;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${3030}/`);
});

server.on("error", console.error);
