import Queue from "bull";
import Redis from "ioredis";
import notificationWorker, { JobData } from "./notification-worker";
import schedulerWorker, { SchedulerJobData } from "./scheduler-worker";

var host = process.env.REDIS_HOST || "";
var port = process.env.REDIS_PORT || "";
var password = process.env.REDIS_PASSWORD || "";

var redisUrl = `redis://:${password}@${host}:${port}`;

/**
 * @class Scheduler
 * @description Scheduler helps in scheduling notifications.
 */
class Scheduler {
  private client;
  private subscriber;
  private redisOpts;

  private notifierQueue: Queue.Queue<JobData>;
  private schedulerQueue: Queue.Queue<SchedulerJobData>;

  constructor() {
    this.client = new Redis(redisUrl, {
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
    });
    this.subscriber = new Redis(redisUrl, {
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
    });

    // configure redis for bull
    this.redisOpts = {
      createClient: (type) => {
        switch (type) {
          case "client":
            return this.client;
          case "subscriber":
            return this.subscriber;
          default:
            return new Redis(redisUrl, {
              maxRetriesPerRequest: null,
              enableReadyCheck: false,
            });
        }
      },
    };

    this.redisOpts.createClient.bind(this);

    // initialize the queues
    this.initialize();
  }

  /**
   * @description Initialize the queues
   * @returns void
   */
  private initialize() {
    this.notifierQueue = new Queue("notifier", this.redisOpts);
    this.notifierQueue.process(notificationWorker);

    this.schedulerQueue = new Queue("scheduler", this.redisOpts);
    this.schedulerQueue.process(schedulerWorker);
  }

  /**
   * @description Schedules notification via any of the registered services
   * @param data notification data
   */
  sendNotification(data: JobData) {
    this.notifierQueue.add(data, {
      removeOnComplete: true,
      attempts: 5,
      backoff: {
        type: "fixed",
        delay: 3000,
      },
    });
  }

  /**
   * @description Schedules bulk notifications for any topic, via any of the registered services
   * @param data notification data
   */
  scheduleNotification(data: SchedulerJobData) {
    this.schedulerQueue.add(data);
  }
}

class Singleton {
  private static instance: Scheduler;
  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = new Scheduler();
    }
  }

  public get instance() {
    return Singleton.instance;
  }
}

export default Singleton;
