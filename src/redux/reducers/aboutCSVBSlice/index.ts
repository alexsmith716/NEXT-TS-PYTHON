import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction } from 'redux';
import { ActionLoadPromiseType, HydrateActionType } from '../../../types';
import { AxiosInstance } from 'axios';

const ABOUTCSVB_LOAD = 'ABOUTCSVB_LOAD';
const ABOUTCSVB_SUCCESS = 'ABOUTCSVB_SUCCESS';
const ABOUTCSVB_FAIL = 'ABOUTCSVB_FAIL';

const headers = {
	//'Content-Type': 'application/json;',
	'Accept-Encoding': '', //gzip,deflate,compress
};

const reducer = (state = {}, action: ActionLoadPromiseType | HydrateActionType) => {
	switch (action.type) {
		case HYDRATE:
			return {
				...state,
				...action.payload.aboutCSVBReducer,
			};
		case ABOUTCSVB_LOAD:
			return {
				...state,
				loading: true,
			};
		case ABOUTCSVB_SUCCESS:
			return {
				...state,
				loading: false,
				loaded: true,
				aboutCSVBData: action['result'],
			};
		case ABOUTCSVB_FAIL:
			return {
				...state,
				loading: false,
				loaded: false,
				aboutCSVBData: action['error'],
			};
		default:
			return {
				...state
			};
	}
};

export default reducer;

export function loadAboutCSVB(): AnyAction {
	const limit: number = Math.floor(Math.random() * 6) + 1;
	return {
		type: [ABOUTCSVB_LOAD, ABOUTCSVB_SUCCESS, ABOUTCSVB_FAIL],
		// line 50 below is used to test /cypress/e2e/nodeEvents/loadAboutSsr_getServerSideProps_spec.ts
		//httpClientPromise: ({httpClient}: {httpClient: AxiosInstance}) => httpClient.get(`https://jsonplaceholder.typicode.com/posts`, {params: {_limit:1}, headers: headers})
		httpClientPromise: ({httpClient}: {httpClient: AxiosInstance}) => httpClient.get(`https://jsonplaceholder.typicode.com/posts`, {params: {_limit:`${limit}`}, headers: headers})
			.then((response) => {
				return {
					props: {
						posts: response
					}
				}
			})
			.catch(() => {
				return Promise.reject({ error: 'Error when attempting to fetch resource.' });
			})
	};
};
