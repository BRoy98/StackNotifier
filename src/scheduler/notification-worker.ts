import { DoneCallback, Job, ProcessCallbackFunction } from "bull";
import Notifier from "../notifier";

interface JobData {
  services: string[];
  to: string;
  message: string;
}

const notificationWorker: ProcessCallbackFunction<JobData> = async (
  job: Job<JobData>,
  done: DoneCallback
) => {
  console.log(`Processing job ${job.id}`);
  console.log(`Processing Job ${job.id} | data: ${JSON.stringify(job.data)}`);

  const notifier = new Notifier();

  notifier.notify(job.data.services, {
    to: "+19403145868",
    message: "Hello World",
  });
  done();
};

export default notificationWorker;
