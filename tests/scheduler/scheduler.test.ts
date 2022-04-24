jest.mock("ioredis", () => jest.requireActual("ioredis-mock"));
import Scheduler from "../../src/scheduler/index";
const OLD_ENV = process.env;

// TODO: setup redis mock for bull
describe.skip("Scheduler", () => {
  beforeAll(() => {
    process.env = {
      ...OLD_ENV,
      TWILIO_ACCOUNT_SID: "ACa7da549870db4996528ecd31dbc7d1ee",
      TWILIO_AUTH_TOKEN: "fc4ff084c7653ba40f5d421f3808f7d2",
      TWILIO_FROM: "+15005550006",
    };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });
  it("should schedule notifications", async () => {
    const scheduler = new Scheduler().instance;

    await scheduler.sendNotification({
      service: "sms",
      to: "+911234567890",
      message: "Hello World",
    });
  });
});
