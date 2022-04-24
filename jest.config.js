/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
require("dotenv").config();
module.exports = {
  preset: "ts-jest",
  // setupFilesAfterEnv: ["jest-extended/all"],
  testEnvironment: "node",
  testPathIgnorePatterns: ["x_tests", ".build"],
};
