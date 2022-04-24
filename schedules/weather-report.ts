import schedule from "node-schedule";
import axios from "axios";

import Scheduler from "@src/scheduler";
const scheduler = new Scheduler().instance;

const getWeather = async (city) => {
  // get weather data for the city
  try {
    const weather = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}`
    );

    return Number(weather.data.current.temp_c);
  } catch (error) {
    // If data not found, return 0
    return 0;
  }
};

const scheduleIt = (cron: string) => {
  const job = schedule.scheduleJob(cron, async () => {
    const weather = await getWeather("bangalore");

    if (weather < 10) {
      console.log("error.invalid-weather-data");
      return;
    }

    scheduler.scheduleNotification({
      messageData: [
        {
          message: `Today's temperature is ${weather}°C`,
          service: "sms",
        },
        {
          message: `Hello Folks, Today's temperature is ${weather} degrees celsius. Enjoy!`,
          service: "email",
        },
      ],
      topic: "weather",
    });
    console.log(`Weather report sent to all subscribers: ${weather}°C`);
  });
};

export default scheduleIt;
