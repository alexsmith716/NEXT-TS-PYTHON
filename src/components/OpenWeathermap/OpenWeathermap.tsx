import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../redux/store';
import { getAddress, loadOpenWeathermap } from '../../redux/reducers/openWeathermapSlice';
import formatString from '../../utils/openWeatherSearchInputStringFormat';
import Loading from '../Loading';
import Button from '../Button';
import * as Styles from './styles';

const OpenWeathermap = () => {
	const dispatch = useDispatch();
	const [openWeatherSearchInput, setOpenWeatherSearchInput] = useState('');

	let openWeathermapDataTemp;

	const formatter = new Intl.NumberFormat('en-US', {
		minimumFractionDigits: 1,
		maximumFractionDigits: 1,
	});

	const loading = useSelector((state: AppState) => state.openWeathermapReducer.loading);
	const loaded = useSelector((state: AppState) => state.openWeathermapReducer.loaded);
	const openWeathermapData = useSelector((state: AppState) => state.openWeathermapReducer.openWeathermapData);

	if(openWeathermapData && !openWeathermapData.error) {
		openWeathermapDataTemp = formatter.format(openWeathermapData.main.temp);
	}

	async function fetchOpenWeather(searchVar: string) {
		if (searchVar.length < 1) {
			return dispatch({type: 'OPENWEATHERMAP_FAIL', error: { error: 'Error when attempting to fetch resource.' }});
		}

		const gc:string | undefined = formatString(searchVar, false);

		await getAddress(searchVar)
			.then((response) => {
				setOpenWeatherSearchInput(gc as string);

				dispatch(loadOpenWeathermap({ lat:response.lat, lon:response.lon }));
			})
			.catch(() => {
				dispatch({type: 'OPENWEATHERMAP_FAIL', error: { error: 'Error when attempting to fetch resource.' }});
			});
	};

	return (
		<div className="container" data-testid="openweathermap-component">
			<Styles.OpenWeathermapContainerBgColor className="flex-column align-items-center mb-5">
				<Styles.OpenWeathermapContainer className="flex-column align-items-center">
					{/* (>>>>>>>>>>>>>>>>>>>>>> LOADING >>>>>>>>>>>>>>>>>>>>>>>>) */}
					{loading && <Loading text="Loading" />}

					{/* (>>>>>>>>>>>>>>>>>>>>>> LOADED >>>>>>>>>>>>>>>>>>>>>>>>) */}
					{!loading && (
						<Styles.OpenWeathermapContainerStyled>
							<div className="mb-2">
								The Exclusive <i>OpenWeather.com</i>&nbsp;forecast{loaded && openWeathermapData && <>&nbsp;for:</>}
							</div>

							<div data-testid="open-weather-data">
								{!loaded && openWeathermapData && openWeathermapData.error && (
									<Styles.DataMessageError>{openWeathermapData.error}</Styles.DataMessageError>
									)}

								{loaded && openWeathermapData && !openWeathermapData.error && (
									<Styles.DataMessageName>{openWeathermapData.name}</Styles.DataMessageName>
									)}
							</div>

							{loaded && openWeathermapData && !openWeathermapData.error && (
								<div><Styles.DataMessage>{openWeathermapData.weather[0].main}</Styles.DataMessage>&nbsp;-&nbsp;<Styles.DataMessage>{openWeathermapData.weather[0].description}</Styles.DataMessage></div>
								)}

							{loaded && openWeathermapData && !openWeathermapData.error && (
								<div><Styles.DataMessageTemp>{openWeathermapDataTemp}&#x00B0;F</Styles.DataMessageTemp></div>
								)}

							<div className="mt-2 mb-3">
								<div className="display-flex justify-content-center">
									<div>
										<input
											type="text"
											className="form-control"
											name="openWeatherSearchInput"
											value={openWeatherSearchInput}
											onChange={(e) => setOpenWeatherSearchInput(e.target.value)}
											placeholder="New York, NY, US"
											data-testid="open-weather-data-form-input"
										/>
										<span><Styles.InputFormat>&#123;city name&#125;,&nbsp;&nbsp;&#123;state code&#125;,&nbsp;&nbsp;&#123;country code&#125;</Styles.InputFormat></span>
									</div>
								</div>
							</div>

							<div data-testid="open-weather-data-form-button">
								<Button
									className="btn-primary btn-md"
									onClick={() => fetchOpenWeather(openWeatherSearchInput)}
									buttonText="Fetch"
								/>
							</div>
						</Styles.OpenWeathermapContainerStyled>
					)}
				</Styles.OpenWeathermapContainer>
			</Styles.OpenWeathermapContainerBgColor>
		</div>
	);
};

export default OpenWeathermap;
