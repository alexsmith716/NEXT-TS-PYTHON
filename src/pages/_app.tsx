import { AppContext, AppInitialProps } from 'next/app';
import Error from 'next/error';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../apollo/apolloClient';
import { wrapper } from '../redux/store';
import { ThemeContext } from '../styled/ThemeContext';
import { Layout } from '../components/Layout';
import { actionSetUserAgent } from '../redux/reducers/userAgentSlice';
import { getAddress, loadOpenWeathermap } from '../redux/reducers/openWeathermapSlice';
import { getUserAgent, isBot } from '../utils/userAgent';
import { LatLonType } from '../types';
import '../styled/fonts.css';

const App = ({ Component, pageProps }: AppContext & AppInitialProps) => {
	const clientApollo = useApollo(pageProps.initialApolloState);

	return (
		<>
			<ApolloProvider client={clientApollo}>
				<ThemeContext>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</ThemeContext>
			</ApolloProvider>
		</>
	);
};

// remove getInitialProps
App.getInitialProps = wrapper.getInitialAppProps((store) => async ({ Component, ctx }) => {
	const isServer = typeof window === 'undefined' && !ctx.req?.url?.startsWith('/_next/data');

	if (isServer) {
		store.dispatch(actionSetUserAgent(getUserAgent(ctx?.req?.headers['user-agent']!), isBot(ctx?.req?.headers['user-agent']!)));
	}

	if (isServer) {
		const startingGeo:string = 'New York, NY, US';
		const latLon = await getAddress(startingGeo)
			.then((response) => {
				return response;
			})
			.catch(() => {
				store.dispatch({type: 'OPENWEATHERMAP_FAIL', error: { error: 'Error when attempting to fetch resource.' }});
				return null;
			});
		if(latLon) {
			await store.dispatch(loadOpenWeathermap((latLon as unknown) as LatLonType))
				.catch((error: Error) => {
					console.error(error);
				})
		}
	}

	const pageProps = {
		...(Component.getInitialProps
			? await Component.getInitialProps({
					...ctx,
					store,
				})
			: {}),
		documentTitle: 'Alex Smith\'s App',
	};

	return {
		pageProps,
	};
});

export default wrapper.withRedux(App);
