jest.mock("ioredis", () => jest.requireActual("ioredis-mock"));
import notificationWorker from "@src/scheduler/notification-worker";

const OLD_ENV = process.env;

describe("Notification Worker", () => {
  // setup the test environment variables
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

  test("it should schedule a notification", (done) => {
    notificationWorker(
      {
        id: "1",
        name: "__default__",
        data: {
          to: "+911234567890",
          message: "Hello World",
          service: "sms",
        },
        opts: {
          removeOnComplete: true,
          attempts: 5,
          backoff: { type: "fixed", delay: 3000 },
          delay: 0,
        },
        // @ts-ignore
        progress: 0,
        delay: 0,
        timestamp: 1650826381436,
        attemptsMade: 0,
        stacktrace: [],
        returnvalue: null,
        finishedOn: 0,
        processedOn: 1650826383762,
      },
      (error, value) => {
        console.log(error, value);
        expect(value).toBe(true);
        done();
      }
    );
  });
});
