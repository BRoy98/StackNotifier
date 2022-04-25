import { DoneCallback, Job, ProcessCallbackFunction } from "bull";
import Scheduler from "@src/scheduler";
import users from "@data/users.json";
import { JobData } from "./notification-worker";

export interface SchedulerJobData {
  messageData: Array<{
    message: string;
    service: string;
  }>;
  topic: string;
}

/**
 * @description Processes a schedule job, schedules notification to the notification queue
 *              for each subscribed user
 * @param job  schedule job data
 * @param  done callback to be called when the job is done
 */
const schedulerWorker: ProcessCallbackFunction<SchedulerJobData> = async (
  job: Job<SchedulerJobData>,
  done: DoneCallback
) => {
  console.log(`Processing Job ${job.id} | data: ${JSON.stringify(job.data)}`);

  try {
    const scheduler = new Scheduler().instance;
    const { topic, messageData } = job.data;

    const filteredUsers = users
      .filter(
        (user) => user.subscriptions.findIndex((s) => s.topic === topic) > -1
      )
      .map((user) => ({
        ...user,
        service:
          user.subscriptions.find((s) => s.topic === topic)?.method || "",
      }));

    filteredUsers.forEach(async (user) => {
      console.log("Sending notification to", user);

      const recipientAddress = user[user.service];
      const message =
        messageData.find((m) => m.service === user.service)?.message || "";

      if (!recipientAddress) {
        console.log(
          "error.user-contact-details-not-found-for-selected-service"
        );
      }

      scheduler.sendNotification({
        to: recipientAddress,
        message,
        service: user.service,
      });
    });
  } catch (error) {}

  done();
};

export default schedulerWorker;
