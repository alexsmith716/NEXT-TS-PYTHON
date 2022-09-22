module.exports = {
	compiler: {
		styledComponents: true,
	},
	reactStrictMode: true,
	env: {},

	webpack: (config, {dev, webpack, isServer}) => {
		config.module.rules.push({
			test: /\.(graphql|gql)$/,
			exclude: /node_modules/,
			loader: 'graphql-tag/loader',
		});
		config.plugins.push(
			new webpack.DefinePlugin({
				__DEV__: dev,
				__IS_SERVER__: isServer,
			})
		);
		return config;
	},

	async rewrites() {
		const env = process.env.NODE_ENV;
		return {
			beforeFiles: [
				{
					source: '/todosapi/:path*',
					destination: `${ env == 'development' ? 'http://localhost:8000' : '' }` + '/todosapi/:path*'
				},
				{
					source: '/fibonacci/:path*',
					destination: `${ env == 'development' ? 'http://localhost:8000' : '' }` + '/fibonacci/:path*'
				},
				{
					source: '/nyccounty/:path*',
					destination: `${ env == 'development' ? 'http://localhost:8000' : '' }` + '/nyccounty/:path*'
				},
				{
					source: '/botosssgetobject/:path*',
					destination: `${ env == 'development' ? 'http://localhost:8000' : '' }` + '/botosssgetobject/:path*'
				},
			],
		};
	},
};
