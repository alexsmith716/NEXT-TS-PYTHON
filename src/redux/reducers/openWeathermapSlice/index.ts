import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction } from 'redux';
import { ActionLoadPromiseType, HydrateActionType, LatLonType } from '../../../types';
import formatString from '../../../utils/openWeatherSearchInputStringFormat';
import axios, { AxiosInstance } from 'axios';

const OPENWEATHERMAP_LOAD = 'OPENWEATHERMAP_LOAD';
const OPENWEATHERMAP_SUCCESS = 'OPENWEATHERMAP_SUCCESS';
const OPENWEATHERMAP_FAIL = 'OPENWEATHERMAP_FAIL';

const reducer = (state = {}, action: ActionLoadPromiseType | HydrateActionType) => {
	switch (action.type) {
		case HYDRATE:
			return {
				...state,
				...action.payload.openWeathermapReducer,
			};
		case OPENWEATHERMAP_LOAD:
			return {
				...state,
				loading: true,
			};
		case OPENWEATHERMAP_SUCCESS:
			return {
				...state,
				loading: false,
				loaded: true,
				openWeathermapData: action['result'],
			};
		case OPENWEATHERMAP_FAIL:
			return {
				...state,
				loading: false,
				loaded: false,
				openWeathermapData: action['error'],
			};
		default:
			return {
				...state
			};
	}
};

export default reducer;

export async function getAddress(geoCode: string) {
	if (geoCode.length < 1) {
		return Promise.reject();
	}

	const gc:string | undefined = formatString(geoCode, true);

	try {
		const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${gc}&limit=1&appid=${process.env.NEXT_PUBLIC_APP_ID}`);
		const ll = {
			lat: response.data[0].lat,
			lon: response.data[0].lon,
		};
		return ll;
	} catch (error) {
		return Promise.reject();
	}
}

export function loadOpenWeathermap(latLon: LatLonType): AnyAction {
	const isServer = typeof window === 'undefined';
	let req: string;

	isServer ? req = `https://api.openweathermap.org/data/2.5/weather?lat=${latLon.lat}&lon=${latLon.lon}&appid=${process.env.NEXT_PUBLIC_APP_ID}&units=imperial` : req = `/api/openweathermap?lat=${latLon.lat}&lon=${latLon.lon}`;
	return {
		type: [OPENWEATHERMAP_LOAD, OPENWEATHERMAP_SUCCESS, OPENWEATHERMAP_FAIL],
		httpClientPromise: ({httpClient}: {httpClient: AxiosInstance}) => httpClient.get(req)
			.then((response) => {
				return response;
			})
			.catch(() => {
				return Promise.reject({ error: 'Error when attempting to fetch resource.' });
			})
	};
};
