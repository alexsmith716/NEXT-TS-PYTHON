import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextApiRequest, NextApiResponse } from 'next';
import schema from '../../apollo/schema';
import { RickAndMortyAPI } from '../../apollo/rickAndMortyAPI';
//import { StrawberryAPI } from '../../apollo/strawberryAPI';

//@ts-ignore
const isDevelopment = process.env.NODE_ENV === "development";

const apolloServer = new ApolloServer({
	schema,
	//plugins: [
	//	isDevelopment ? :,
	//],
	//introspection: isDevelopment ? true : false,
	introspection: isDevelopment ? true : false,
});

const apolloHandler = startServerAndCreateNextHandler(apolloServer, {
	//@ts-ignore
	context: async (req: NextApiRequest, res: NextApiResponse) => {
		return {
			dataSources: {
				rickAndMorty: new RickAndMortyAPI(),
			},
		};
	},
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		await apolloHandler(req, res);
	} catch (error) {
		//res.send(res, (error as any).statusCode || 500, (error as Error).message);
		res.status(500).send('Error when attempting to fetch resource.');
	}
};
