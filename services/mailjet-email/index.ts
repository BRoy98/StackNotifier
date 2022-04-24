import { Twilio } from "twilio";
import * as mailjet from "node-mailjet";
import serviceConfig from "./config.json";
import { validate } from "./validator";

interface MailExecData {
  to: string;
  message: string;
}

interface IHandler {
  id: string;
  name: string;
  exec: (data: MailExecData) => Promise<boolean>;
}

class Handler implements IHandler {
  private config;
  private client;

  public id = serviceConfig.id;
  public name = serviceConfig.name;

  constructor(config) {
    this.config = config;
    validate(this.config);

    this.client = mailjet.connect(config.apiKey, config.apiSecret);
  }

  // channel's notification executor
  async exec(data: { to: string; message: string }) {
    try {
      const { to, message } = data;

      const response = await this.client
        .post("send", { version: "v3.1" })
        .request({
          Messages: [
            {
              From: {
                Email: "mail.broy.sh@gmail.com",
                Name: "Notifier",
              },
              To: [
                {
                  Email: to,
                  Name: to,
                },
              ],
              Subject: "Notifier Update",
              TextPart: message,
              HTMLPart: `<h3>${message}</h3>`,
              CustomID: "AppGettingStartedTest",
            },
          ],
        });

      if (!response) {
        console.debug(`email-service: send.fail: ${response}`);
        return false;
      }

      console.debug(`email-service: send.success`);
      return true;
    } catch (error) {
      console.debug(`email-service: send.fail: ${error.message}`);
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
