import React, { useState, useEffect, useMemo } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../redux/store';
import { loadNYCBridgeRatings } from '../redux/reducers/nycBridgeRatingsSlice';
import BridgeRatingsCsvGridColumnHeader from '../components/BridgeRatingsCsvGridColumnHeader';
import BridgeRatingsCsvGridRowItems from '../components/BridgeRatingsCsvGridRowItems';
import Loading from '../components/Loading';

interface NYCBridgeRatingsPageProps {
	documentTitle: string;
};

const NYCBridgeRatings: NextPage<NYCBridgeRatingsPageProps> = ({documentTitle}) => {
	const dispatch = useDispatch();

	const loading = useSelector((state: AppState) => state.nycBridgeRatingsReducer.loading);
	const loaded = useSelector((state: AppState) => state.nycBridgeRatingsReducer.loaded);
	const data = useSelector((state: AppState) => state.nycBridgeRatingsReducer.data);
	const [title, setTitle] = useState('');

	useEffect(() => {
		if (!loaded) {
			dispatch(loadNYCBridgeRatings())
				.catch((error: Error) => {
					console.error(error);
				})
		}
	}, [loaded, dispatch]);

	useEffect(() => {
		setTitle(documentTitle+':\u0020NYCBridgeRatings');
	}, [documentTitle]);

	const bridgeRCGColumnHeader = useMemo(() => BridgeRatingsCsvGridColumnHeader(data!), [data]);
	const bridgeRCGRowItems = useMemo(() => BridgeRatingsCsvGridRowItems(data!), [data]);

	return (
		<>
			<Head>
				<title>{ !title ? documentTitle : title }</title>
			</Head>

			<div className="container">
				<h1 className="mt-4 mb-3">NYC Bridge Ratings</h1>

				<h2 className="mb-3">Bridge Conditions, NYS Department of Transportation</h2>

				<h3 className="mb-3">Dataset Updated: April 1, 2022</h3>

				<div className="word-break-all mb-3">
					<p>
						Data Source here: <a href="https://data.cityofnewyork.us/Transportation/Bridge-Ratings/4yue-vjfc" target="_blank" rel="noreferrer">https://data.cityofnewyork.us/Transportation/Bridge-Ratings/4yue-vjfc</a>.
					</p>
				</div>

				<div className="mb-3">
					<p>
						New York State inspectors assess all of the bridges every two years including a
						bridge&apos;s individual parts. Bridges are analyzed for their capacity to carry
						vehicular loads. Inspectors are required to evaluate, assign a condition score, and
						document the condition of up to 47 structural es, including rating 25 components of
						each span of a bridge, in addition to general components common to all bridges. The
						NYSDOT condition rating scale ranges from 1 to 7, with 7 being in new condition and a
						rating of 5 or greater considered as good conditionBridges that cannot safely carry
						heavy vehicles, such as some tractor trailers, are posted with weight limits. Based
						upon inspection and load capacity analysis, any bridge deemed unsafe gets closed.
					</p>
				</div>

				<div className="overflow-wrap-break-word mb-3">
					{/* (>>>>>>>>>>>>>>>>>>>>>> LOADING >>>>>>>>>>>>>>>>>>>>>>>>) */}
					{loading && (
						<div className="bg-progress-blue container-padding-radius-10 text-color-white">
							<Loading text="Loading" />
						</div>
					)}

					{/* (>>>>>>>>>>>>>>>>>>>>>> ERROR >>>>>>>>>>>>>>>>>>>>>>>>) */}
					{!loading && !loaded && data && (
						<div className="bg-warn-red container-padding-radius-10 text-color-white">
							{data}
						</div>
					)}

					{/* (>>>>>>>>>>>>>>>>>>>>>>>> LOADED >>>>>>>>>>>>>>>>>>>>>>>>) */}
					{!loading && loaded && data && (
						<div className="bg-color-ivory container-padding-border-radius-1">
							<div className="table-bridge-ratings-wrapper">
								<div className="table-bridge-ratings-csv-repeat-6 table-bridge-ratings-display">
									{bridgeRCGColumnHeader}
									{bridgeRCGRowItems}
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default NYCBridgeRatings;
