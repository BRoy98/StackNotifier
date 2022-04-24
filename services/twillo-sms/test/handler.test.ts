import handler from "../index";
const OLD_ENV = process.env;

describe("SMS Service", () => {
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

  it("Should send SMS successfully", async () => {
    const { id, exec } = handler({
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
      from: process.env.TWILIO_FROM,
    });

    // Set up test data
    const response = await exec({
      to: "+911234567890",
      message: "Hello World!",
    });

    expect(id).toBe("sms");
    expect(response).toBeTruthy();
  });

  it("Should throw error if accountSid is not provided", async () => {
    // Set up test data
    try {
      const { exec } = handler({
        authToken: process.env.TWILIO_AUTH_TOKEN,
        from: process.env.TWILIO_FROM,
      });
    } catch (error) {
      expect(error.message).toBe("error.twilio-account-sid-required");
    }
  });

  it("Should throw error if authToken is not provided", async () => {
    // Set up test data
    try {
      const { exec } = handler({
        accountSid: process.env.TWILIO_ACCOUNT_SID,
        from: process.env.TWILIO_FROM,
      });
    } catch (error) {
      expect(error.message).toBe("error.twilio-auth-token-required");
    }
  });

  it("Should throw error if from is not provided", async () => {
    // Set up test data
    try {
      const { exec } = handler({
        accountSid: process.env.TWILIO_ACCOUNT_SID,
        authToken: process.env.TWILIO_AUTH_TOKEN,
      });
    } catch (error) {
      expect(error.message).toBe("error.twilio-from-required");
    }
  });
});
