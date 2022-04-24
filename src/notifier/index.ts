import {
  INotificationManager,
  NotificationData,
  NotifierManager,
} from "./notifier-manager";

import smsHandler from "@services/twillo-sms";
import mailHandler from "@services/mailjet-email";

interface INotifier {
  services: () => string[];
  notify: (
    services: string,
    data: {
      to: string;
      message: string;
    }
  ) => void;
}

/**
 * @class Notifier
 * @description Notifier helps in sending notifications to the registered services.
 */
class Notifier implements INotifier {
  private notifierManager: INotificationManager;

  constructor() {
    this.notifierManager = new NotifierManager();
    this.initialize();
  }

  /**
   * @description Register the notification services
   */
  private initialize() {
    this.notifierManager.register(smsHandler, {
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
      from: process.env.TWILIO_FROM,
    });

    this.notifierManager.register(mailHandler, {
      apiKey: process.env.MAILJET_API_KEY,
      apiSecret: process.env.MAILJET_API_SECRET,
    });
  }

  /**
   * @description Sends a notification to the registered services
   * @param services List of services to send notifications to
   * @param data Notification data
   */
  notify = async (service: string, data: NotificationData) => {
    // Check if the services are valid
    if (!this.notifierManager.services().includes(service)) {
      throw new Error(`error.unregistered-service: ${service}`);
    }

    // Send notifications to the registered services
    return this.notifierManager.send(service, data);
  };

  /**
   * @description Returns a list of registered notification services
   * @returns list of registered services
   */
  services = () => {
    return this.notifierManager.services();
  };
}

export default Notifier;
