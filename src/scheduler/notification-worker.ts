import { DoneCallback, Job, ProcessCallbackFunction } from "bull";
import Notifier from "../notifier";

export interface JobData {
  service: string;
  to: string;
  message: string;
}

/**
 * @description Processes a notification job, sends notification to the recipient
 * @param job notification job data
 * @param done callback to be called when the job is done
 */
const notificationWorker: ProcessCallbackFunction<JobData> = async (
  job: Job<JobData>,
  done: DoneCallback
) => {
  console.log(`Processing Job ${job.id} | data: ${JSON.stringify(job.data)}`);

  try {
    const notifier = new Notifier();

    const { service, to, message } = job.data;

    const notify = await notifier.notify(service, {
      to,
      message,
    });

    if (!notify) done(new Error("error.notification-sending-failed"));

    done(null, notify);
  } catch (error) {
    done(error);
  }
};

export default notificationWorker;
