import { PageConfig } from 'next';
import { ApolloServer } from 'apollo-server-micro';
//import { text } from 'micro';
import { MicroRequest } from 'apollo-server-micro/dist/types';
import { send } from 'micro';
import { ServerResponse } from 'http';
import schema from '../../apollo/schema';
import { RickAndMortyAPI } from '../../apollo/rickAndMortyAPI';
import { StrawberryAPI } from '../../apollo/strawberryAPI';

export const config: PageConfig = {
	api: {
		bodyParser: false,
	},
};

const apolloServer = new ApolloServer({
	schema,
	dataSources: () => {
		return {
			rickAndMorty: new RickAndMortyAPI(),
			strawberryAPI: new StrawberryAPI(),
		};
	},
});

const startServer = apolloServer.start();

export default async function handler(req: MicroRequest, res: ServerResponse) {
	//const reqQuery = await text(req);
	try {
		await startServer;
		await apolloServer.createHandler({path: '/api/graphql'})(req, res);
	} catch (error) {
		//send(res, 400, {error: 'Error when attempting to fetch resource.'});
		send(res, (error as any).statusCode || 400, (error as Error).message);
	}
};
