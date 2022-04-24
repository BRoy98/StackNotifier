import { Twilio } from "twilio";
import serviceConfig from "./config.json";
import { validate } from "./validator";

interface SMSExecData {
  to: string;
  message: string;
}

interface IHandler {
  id: string;
  name: string;
  exec: (data: SMSExecData) => Promise<boolean>;
}

class Handler implements IHandler {
  private config;
  private client;

  public id = serviceConfig.id;
  public name = serviceConfig.name;

  constructor(config) {
    this.config = config;
    validate(this.config);

    this.client = new Twilio(config.accountSid, config.authToken);
  }

  // channel's notification executor
  async exec(data: { to: string; message: string }) {
    try {
      const { to, message } = data;
      const response = await this.client.messages.create({
        body: message,
        from: this.config.from,
        to: to,
      });

      if (!response) {
        console.debug(`sms-service: send.fail: ${response}`);
        return false;
      }

      console.debug(`sms-service: send.success: ${response.sid}`);
      return true;
    } catch (error) {
      console.debug(`sms-service: send.fail: ${error.message}`);
      throw error;
    }
  }
}

const handler = (credentials) => {
  const client = new Handler(credentials);
  const exec = client.exec;
  return {
    id: client.id,
    name: client.name,
    exec: exec.bind(client),
  };
};

export default handler;
