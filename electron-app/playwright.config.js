const { devices } = require("@playwright/test");

/**
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: "./tests",
  timeout: 60 * 1000,
  retries: 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    headless: false,
    viewport: { width: 1280, height: 800 },
    ignoreHTTPSErrors: true,
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "electron",
      use: {
        // Launch the Electron app from the `electron-app` directory
        launchOptions: {
          executablePath: require("electron"), // resolve the installed electron binary
          args: ["."],
          cwd: __dirname + "/electron-app",
        },
      },
    },
  ],
};

module.exports = config;
