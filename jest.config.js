/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
require("dotenv").config();
module.exports = {
  preset: "ts-jest",
  // setupFilesAfterEnv: ["jest-extended/all"],
  testEnvironment: "node",
  testPathIgnorePatterns: ["x_tests", ".build"],
  moduleNameMapper: {
    "@services/(.*)": ["<rootDir>/services/$1"],
    "@data/(.*)": ["<rootDir>/data/$1"],
    "@src/(.*)": ["<rootDir>/src/$1"],
    "@schedules/(.*)": ["<rootDir>/schedules/$1"],
  },
};
