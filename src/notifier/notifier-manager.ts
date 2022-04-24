export interface INotificationManager {
  register(service: any, config: any): NotifierManager;
  services(): string[];
  send(service: string, data: NotificationData): void;
}

export interface NotificationData {
  to: string;
  message: string;
}

/**
 * @class NotifierManager
 * @description Notification Manager helps in registering notification services
 *              and sending notifications to the registered services.
 */
export class NotifierManager implements INotificationManager {
  private notifierServices = {};

  /**
   * @description Registers a notification service
   * @param handler notification handler
   * @param credentials service credentials
   * @returns NotifierManager instance
   */
  register = (handler, credentials) => {
    const { id, exec } = handler(credentials);
    this.notifierServices[id] = exec;
    return this;
  };

  /**
   * @description Returns a list of registered notification services
   * @returns list of registered services
   */
  services = () => {
    return Object.keys(this.notifierServices);
  };

  /**
   * @description Sends a notification to a registered service
   * @param service name of a registered service
   * @param data notification data
   */
  send = async (service, data: NotificationData) => {
    try {
      const handler = this.notifierServices[service];
      if (!handler) {
        throw new Error(`error.invalid-service: ${service}`);
      }
      return handler(data);
    } catch (error) {
      console.error(`error.notifier-manager: ${error.message}`);
    }
  };
}
