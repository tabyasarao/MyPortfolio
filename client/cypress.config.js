import { defineConfig } from "cypress";

export default defineConfig({
  video: true, // ⭐ enable video recording
  e2e: {
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      // event listeners here
    },
  },
});
