require("dotenv").config();
import express from "express";
import scheduleRoute from "./src/routes/schedule.route";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/notifier", scheduleRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  return res.status(500).send(err.message);
});

const port = process.env.PORT || 3030;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${3030}/`);
});
server.on("error", console.error);
