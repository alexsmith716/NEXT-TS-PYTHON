import nock from 'nock';
import http from 'http';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

export default async function(on: any, config: any) {
	const app = next({ dev, hostname, port });
	const handleNextRequests = app.getRequestHandler();
	await app.prepare();

	const customServer = new http.Server(async (req, res) => {
		return handleNextRequests(req, res);
	});

	await new Promise<void>((resolve, reject) => {
		customServer.listen(3000, (err?: any) => {
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

		async nockGetOpenWeatherMapSuccess({ hostname, geocodePath, weatherDataPath, statusCode, body }: { hostname: any; geocodePath: any; weatherDataPath: any; statusCode: any; body: any }) {
			nock.activate();
			nock(hostname)
				.get(geocodePath)
				.reply(statusCode, body.geocoding)
				.get(weatherDataPath)
				.reply(statusCode, body.weatherData)
			return null;
		},

		async nockGetOpenWeatherMapFail({ hostname, geocodePath, statusCode, body }: { hostname: any; geocodePath: any; statusCode: any; body: any }) {
			nock.activate();
			nock(hostname)
				.get(geocodePath)
				.reply(statusCode, body)
			return null;
		},

		async nockNoReturn({ hostname, path, statusCode, body }: { hostname: any; path: any; statusCode: any; body: any }) {
			nock.activate();
			nock(hostname)
				.get(path)
				.reply(statusCode, body);
			return null;
		},
	});

	return config;
};
