const validate = (credentials) => {
  if (!credentials) {
    throw new Error("error.missing-credentials");
  }

  if (!credentials.apiKey) {
    throw new Error("error.mailjet-api-key-required");
  }

  if (!credentials.apiSecret) {
    throw new Error("error.mailjet-api-secret-required");
  }
};

export { validate };
