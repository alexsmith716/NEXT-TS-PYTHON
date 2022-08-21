import { defineConfig } from 'cypress';

export default defineConfig({
	watchForFileChanges: false,
	screenshotOnRunFailure: false,
	video: false,

	e2e: {
		baseUrl: 'http://localhost:3000',
		specPattern: 'cypress/e2e/*_spec.{ts,tsx}',
		supportFile: false,
	},
});
