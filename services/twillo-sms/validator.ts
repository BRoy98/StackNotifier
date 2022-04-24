const validate = (credentials) => {
  if (!credentials) {
    throw new Error("error.missing-credentials");
  }

  if (!credentials.accountSid) {
    throw new Error("error.twilio-account-sid-required");
  }

  if (!credentials.authToken) {
    throw new Error("error.twilio-auth-token-required");
  }

  if (!credentials.from) {
    throw new Error("error.twilio-from-required");
  }
};

export { validate };
