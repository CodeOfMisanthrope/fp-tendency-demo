import type { Config } from "jest";

const config: Config = {
	rootDir: "./",
	projects: ["<rootDir>"],
	testMatch: [
		"<rootDir>/src/**/*[sS]pec.ts",
		"<rootDir>/src/**/?(*.)+(spec).ts",
	],
	moduleNameMapper: {
		"~core/(.*)": "<rootDir>/src/lib/$1",
	},

	preset: "ts-jest",
	testEnvironment: "node",

	collectCoverage: true,
	coverageDirectory: "coverage",
	coverageProvider: "v8",
};

export default config;
