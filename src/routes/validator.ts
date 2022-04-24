import { body } from "express-validator";

const sendValidator = () => {
  return [
    body("service").notEmpty().withMessage("service value is required"),
    body("to").notEmpty().withMessage("to value is required"),
    body("message").notEmpty().withMessage("message value is required"),
  ];
};

const sendToTopicValidator = () => {
  return [
    body("topic").notEmpty().withMessage("service value is required"),
    body("messages")
      .notEmpty()
      .withMessage("'message' value is required")
      .custom((value) => {
        try {
          const parsed = JSON.parse(value);
          console.log("parsed", parsed, Array.isArray(parsed));
          if (Array.isArray(parsed)) {
            return Promise.resolve();
          }
          return Promise.reject("'message' value is invalid");
        } catch (error) {
          console.log("error", error);
          return Promise.reject(
            "'messages' must be a stringified array of message objects"
          );
        }
      }),
  ];
};

export { sendValidator, sendToTopicValidator };
