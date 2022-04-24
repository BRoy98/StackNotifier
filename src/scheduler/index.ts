import Queue from "bull";
import Redis from "ioredis";
import notificationWorker from "./notification-worker";

var host = process.env.REDIS_HOST || "";
var port = process.env.REDIS_PORT || "";
var password = process.env.REDIS_PASSWORD || "";

var redisUrl = `redis://:${password}@${host}:${port}`;

class Scheduler {
  private client;
  private subscriber;
  private redisOpts;

  private notifierQueue: Queue.Queue;
  private schedulerQueue: Queue.Queue;

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

  private initialize() {
    this.notifierQueue = new Queue("notifier", this.redisOpts);
    this.notifierQueue.process(notificationWorker);
  }

  sendNotification(data) {
    this.notifierQueue.add(data);
  }

  scheduleNotification(data) {
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
