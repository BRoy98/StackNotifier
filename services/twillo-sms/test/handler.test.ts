// jest.mock("../sms.client");

describe("SMS Service", () => {
  // beforeEach(() => {
  //   const notifications = {
  //     create: jest.fn().mockImplementation(() => {
  //       return {
  //         sid: "sid",
  //       };
  //     }),
  //   };
  //   notifyService["notifications"] = notifications;
  // });

  it("Should send bulk SMS successfully", async () => {
    const handler = require("..");

    // Set up test data
    const response = await handler(["+1234567890"], "Hello World!");
    expect(response).toBeTruthy();
  });
});
