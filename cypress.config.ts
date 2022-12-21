import { defineConfig } from 'cypress';
import webpackPreprocessor from "@cypress/webpack-preprocessor";

export default defineConfig({
	watchForFileChanges: false,
	screenshotOnRunFailure: false,
	video: false,

	e2e: {
		baseUrl: 'http://localhost:3000',
		specPattern: 'cypress/e2e/*_spec.{js,jsx,ts,tsx}',
		supportFile: false,
		//@ts-ignore
		setupNodeEvents(on, config: Cypress.PluginConfigOptions) {
			// ************ probably can modify & use Cypress's default webpack config here ***********
			// const options = webpackPreprocessor.defaultOptions;
			// options.webpackOptions.module.rules[0].use[0].options.presets.push('preset-stage-3');
			// options.webpackOptions.module.rules[0].use[0].options.plugins = ['@babel/plugin-proposal-optional-chaining',];
			const options = { webpackOptions: require('./webpack.config.js') };
			on('file:preprocessor', webpackPreprocessor(options));
		}
	},
});
