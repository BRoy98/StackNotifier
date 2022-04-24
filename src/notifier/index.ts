import {
  INotificationManager,
  NotificationData,
  NotifierManager,
} from "./notifier-manager";

import smsHandler from "@services/twillo-sms";

interface INotifier {
  services: () => string[];
  notify: (
    services: string[],
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
  initialize() {
    this.notifierManager.register(smsHandler, {
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
      from: process.env.TWILIO_FROM,
    });
  }

  /**
   * @description Sends a notification to the registered services
   * @param services List of services to send notifications to
   * @param data Notification data
   */
  notify = async (services: string[], data: NotificationData) => {
    // Check if the services are valid
    const unregisteredServices = services.filter(
      (service) => !this.notifierManager.services().includes(service)
    );

    if (unregisteredServices.length > 0) {
      throw new Error(
        `error.unregistered-services: ${unregisteredServices.join(", ")}`
      );
    }

    // Send notifications to the registered services
    const result = await Promise.all(
      services.map((service) => this.notifierManager.send(service, data))
    );

    return result;
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
