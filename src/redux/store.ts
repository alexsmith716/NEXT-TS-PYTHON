import { createWrapper } from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
//Middleware
import { AxiosInstance } from 'axios';
//@ts-ignore
import persistStore from 'redux-persist/es/persistStore';
import clientMiddleware from './clientMiddleware';
import userAgentReducer from './reducers/userAgentSlice';
import dateNowReducer from './reducers/dateNowSlice';
import nycBridgeRatingsReducer from './reducers/nycBridgeRatingsSlice';
import aboutCSVBReducer from './reducers/aboutCSVBSlice';
import openWeathermapReducer from './reducers/openWeathermapSlice';
import bridgeRatingsFullReducer from './reducers/bridgeRatingsFullSlice';
import bridgeRatingsReplacementCostReducer from './reducers/bridgeRatingsReplacementCostSlice';
import bridgeRatingsReducer from './reducers/bridgeRatingsSlice';

import apiClient from '../utils/apiClient';

export interface ApiClient {
	httpClient: AxiosInstance;
};

const rootReducer = combineReducers({
	userAgentReducer,
	dateNowReducer,
	nycBridgeRatingsReducer,
	aboutCSVBReducer,
	openWeathermapReducer,
	bridgeRatingsFullReducer,
	bridgeRatingsReplacementCostReducer,
	bridgeRatingsReducer,
});

//const logger: Middleware = store => next => action => {
//  console.group(action.type)
//  console.info('dispatching', action)
//  let result = next(action)
//  console.log('next state', store.getState())
//  console.groupEnd()
//  return result
//}

const bindMiddleware = (middleware: any) => {
	if (process.env.NODE_ENV !== 'production') {
		//@ts-ignore
		//middleware.push(logger);
	}
	return middleware;
}

const makeStore = () => {
	const api = apiClient();
	const providers = { httpClient: api };
	const isServer = typeof window === 'undefined';

	if (isServer) {
		return configureStore({
			reducer: rootReducer,
			middleware: bindMiddleware([clientMiddleware(providers)]),
		});
	} else {
		const { persistStore, persistReducer } = require('redux-persist');
		const storage = require('redux-persist/lib/storage').default;

		const persistConfig = {
			key: 'root',
			whitelist: [
				'userAgentReducer',
				'dateNowReducer',
				'nycBridgeRatingsReducer',
				'aboutCSVBReducer',
				'openWeathermapReducer',
				'bridgeRatingsFullReducer',
				'bridgeRatingsReplacementCostReducer',
				'bridgeRatingsReducer',
			],
			storage,
		};

		const persistedReducer = persistReducer(persistConfig, rootReducer);

		const store = configureStore({
			reducer: persistedReducer,
			middleware: bindMiddleware([clientMiddleware(providers)]),
		});
	
		persistStore(store);
		return store;
	}
}

export type AppState = ReturnType<typeof rootReducer>;
export const wrapper = createWrapper(makeStore);
