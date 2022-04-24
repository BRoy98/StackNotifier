import Notifier from "@src/notifier";

const OLD_ENV = process.env;

describe("Notifier", () => {
  const notifier = new Notifier();

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

  it("should send a notification to the registered services", async () => {
    const notify = await notifier.notify("sms", {
      to: "+911234567890",
      message: "Hello World",
    });

    expect(notify).toBe(true);
  });

  it("should throw an error if the service is not registered", async () => {
    const notifier = new Notifier();

    try {
      await notifier.notify("invalid-service", {
        to: "+211234567890",
        message: "Hello World",
      });
    } catch (err) {
      expect(err.message).toBe("error.unregistered-service: invalid-service");
    }
  });
});
