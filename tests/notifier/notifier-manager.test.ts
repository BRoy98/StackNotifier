import { NotifierManager } from "@src/notifier/notifier-manager";
import smsHandler from "@services/twillo-sms";

const OLD_ENV = process.env;

describe("Notifier Manager", () => {
  const notifierManager = new NotifierManager();

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

  afterEach(() => {
    notifierManager.deRegisterAll();
  });

  it("should register a notification service", () => {
    notifierManager.register(smsHandler, {
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
      from: process.env.TWILIO_FROM,
    });

    expect(notifierManager.services()).toEqual(["sms"]);
  });

  it("should throw an error if the service is already registered", () => {
    try {
      notifierManager.register(smsHandler, {
        accountSid: process.env.TWILIO_ACCOUNT_SID,
        authToken: process.env.TWILIO_AUTH_TOKEN,
        from: process.env.TWILIO_FROM,
      });
    } catch (err) {
      expect(err.message).toBe("error.service-already-registered: sms");
    }
  });

  it("should send a notification to the registered services", async () => {
    notifierManager.register(smsHandler, {
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
      from: process.env.TWILIO_FROM,
    });
    const notify = await notifierManager.send("sms", {
      to: "+911234567890",
      message: "Hello World",
    });

    expect(notify).toBe(true);
  });
});
