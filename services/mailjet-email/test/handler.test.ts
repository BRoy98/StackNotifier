import handler from "../index";
const OLD_ENV = process.env;

describe("Email Service", () => {
  beforeAll(() => {
    process.env = {
      ...OLD_ENV,
      MAILJET_API_KEY: "a8b9b9b9-b9b9-b9b9-b9b9-b9b9b9b9b9b9",
      MAILJET_API_SECRET: "b9b9b9b9-b9b9-b9b9-b9b9-b9b9b9b9b9b9",
    };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  // TODO: setup node-mailjet mock
  it.skip("Should send email successfully", async () => {
    const { id, exec } = handler({
      apiKey: process.env.MAILJET_API_KEY,
      apiSecret: process.env.MAILJET_API_SECRET,
    });
  });

  it("Should throw error if apiSecret is not provided", async () => {
    // Set up test data
    try {
      const { exec } = handler({
        apiKey: process.env.MAILJET_API_SECRET,
      });
    } catch (error) {
      expect(error.message).toBe("error.mailjet-api-secret-required");
    }
  });

  it("Should throw error if apiKey is not provided", async () => {
    // Set up test data
    try {
      const { exec } = handler({
        apiSecret: process.env.MAILJET_API_KEY,
      });
    } catch (error) {
      expect(error.message).toBe("error.mailjet-api-key-required");
    }
  });
});
