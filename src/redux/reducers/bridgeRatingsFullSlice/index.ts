import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction } from 'redux';
import { ActionLoadPromiseType, HydrateActionType } from '../../../types';
import { fetchData } from '../../../utils/fetchAPI';

const BRIDGE_RATINGS_FULL_LOAD = 'BRIDGE_RATINGS_FULL_LOAD';
const BRIDGE_RATINGS_FULL_LOAD_SUCCESS = 'BRIDGE_RATINGS_FULL_LOAD_SUCCESS';
const BRIDGE_RATINGS_FULL_LOAD_FAIL = 'BRIDGE_RATINGS_FULL_LOAD_FAIL';

const reducer = (state = {}, action: ActionLoadPromiseType | HydrateActionType) => {
	switch (action.type) {
		case HYDRATE:
			return {
				...state,
				...action.payload.bridgeRatingsFullReducer,
			};
		case BRIDGE_RATINGS_FULL_LOAD:
			return {
				...state,
				loading: true,
			};
		case BRIDGE_RATINGS_FULL_LOAD_SUCCESS:
			return {
				...state,
				loading: false,
				loaded: true,
				data: action['result'],
			};
		case BRIDGE_RATINGS_FULL_LOAD_FAIL:
			return {
				...state,
				loading: false,
				loaded: false,
				data: action['error'],
			};
		default:
			return {
				...state
			};
	}
};

export default reducer;

export function loadBridgeRatingsFull(): AnyAction {
	return {
		type: [BRIDGE_RATINGS_FULL_LOAD, BRIDGE_RATINGS_FULL_LOAD_SUCCESS, BRIDGE_RATINGS_FULL_LOAD_FAIL],
		httpClientPromise: () => fetchData('botosssgetobject/streambridgeratings')
			.then((response) => {
				return {'data': response};
			})
			.catch((error) => {
				return Promise.reject(error);
			})
	};
};
