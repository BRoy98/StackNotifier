jest.mock("ioredis", () => jest.requireActual("ioredis-mock"));
import schedulerWorker from "@src/scheduler/scheduler-worker";
const OLD_ENV = process.env;

// TODO: setup redis mock for bull
describe.skip("Scheduler Worker", () => {
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
    schedulerWorker(
      {
        id: "728",
        name: "__default__",
        data: {
          messageData: [
            { message: "Today's temperature is 26°C", service: "sms" },
            {
              message:
                "Hello Folks, Today's temperature is 26 degrees celsius. Enjoy!",
              service: "email",
            },
          ],
          topic: "weather",
        },
        opts: { attempts: 1, delay: 0 },
        // @ts-ignore
        progress: 0,
        delay: 0,
        timestamp: 1650827581106,
        attemptsMade: 0,
        stacktrace: [],
        returnvalue: null,
        finishedOn: 0,
        processedOn: 1650827581412,
      },
      (error, value) => {
        console.log(error, value);
        expect(value).toBe(true);
        done();
      }
    );
  });
});
