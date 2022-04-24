import Scheduler from "./index";

describe("Scheduler", () => {
  it("should schedule notifications", async () => {
    const scheduler = new Scheduler().instance;

    console.log(`Scheduler: Scheduling notification`);
    // await scheduler.sendNotification({
    //   services: ["email"],
    //   message: "Hello World",
    // });
  });
});
