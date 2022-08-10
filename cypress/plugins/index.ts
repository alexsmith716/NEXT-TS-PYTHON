const nock = require('nock');
const http = require('http');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

module.exports = async (on, config) => {
	//config.env.APP_ID_CONFIG = process.env.NEXT_PUBLIC_APP_ID;
	const app = next({ dev, hostname, port });
	const handleNextRequests = app.getRequestHandler();
	await app.prepare();

	const customServer = new http.Server(async (req, res) => {
		return handleNextRequests(req, res);
	});

	await new Promise((resolve, reject) => {
		customServer.listen(3000, (err) => {
			if (err) {
				return reject(err);
			}
			console.log('> Ready on http://localhost:3000');
			resolve();
		})
	});

	on('task', {
		clearNock() {
			nock.restore();
			nock.cleanAll();
			return null;
		},

		async nockGetOpenWeatherMapSuccess({ hostname, method, geocodePath, weatherDataPath, statusCode, body }) {
			nock.activate();
			nock(hostname)
				.get(geocodePath)
				.reply(statusCode, body.geocoding)
				.get(weatherDataPath)
				.reply(statusCode, body.weatherData)
			return null;
		},

		async nockGetOpenWeatherMapFail({ hostname, method, geocodePath, statusCode, body }) {
			nock.activate();
			nock(hostname)
				.get(geocodePath)
				.reply(statusCode, body)
			return null;
		},

		async nockNoReturn({ hostname, method, path, statusCode, body }) {
			nock.activate();
			nock(hostname)[method](path).reply(statusCode, body);
			return null;
		},
	});
	return config;
};
