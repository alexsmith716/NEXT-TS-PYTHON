import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Button from '../components/Button';
import { bridgeRatingsCsvGridColumnHeader, bridgeRatingsCsvGridRowItems } from '../utils/gridCsvHeaderRows';
import Loading from '../components/Loading';

interface PythonAPIProps {
	documentTitle?: string;
};

type TodosType = {
	data?: {
		id: number
		item: string
	}[];
	error?: string;
};

type FibonacciType = {
	data?: number[];
	error?: string;
};

type NycCountyType = {
	data?: string;
	error?: string;
};

type BbReplacementCostType = {
	data?: string;
	error?: string;
};

type BridgeRatingsFullType = {
	data?: string;
	error?: string;
};

type BridgeRatingsType = {
	data?: string;
	error?: string;
};

//type DfTableSchemaFieldType  = {
//	name?: string;
//	type?: string | number;
//};

//type DfTableDataType = {
//	index?: number;
//	BIN?: number;
//	Borough?: string;
//	FeatureCarried?: string;
//	CurrentRating?: number;
//	VerbalRating?: string;
//	ReplacementCost?: number;
//	Latitude?: number;
//	Longitude?: number;
//};

//type BridgeRatingsDataFrameType = {
//	data?: {
//		schema: {
//			fields: DfTableSchemaFieldType[];
//		};
//		data: DfTableDataType[];
//	};
//	error?: string;
//};

const PythonAPI: NextPage<PythonAPIProps> = ({ documentTitle }) => {
	const [title, setTitle] = useState("");

	const [todosLoading, setTodosLoading] = useState(false);
	const [fibonacciLoading, setFibonacciLoading] = useState(false);
	const [nycCountyLoading, setNycCountyLoading] = useState(false);
	const [bBReplacementCostLoading, setBBReplacementCostLoading] = useState(false);
	const [bridgeRatingsFullLoading, setBridgeRatingsFullLoading] = useState(false);
	const [bridgeRatingsLoading, setBridgeRatingsLoading] = useState(false);

	const [todos, setTodos] = useState<TodosType>();
	const [fibonacci, setFibonacci] = useState<FibonacciType>();
	const [nycCounty, setNycCounty] = useState<NycCountyType>();
	const [bBReplacementCost, setBBReplacementCost] = useState<BbReplacementCostType>();
	const [bridgeRatingsFull, setBridgeRatingsFull] = useState<BridgeRatingsFullType>();
	const [bridgeRatings, setBridgeRatings] = useState<BridgeRatingsType>();

	function fetchData(route: string, param?: string): Promise<any> {
		return fetch('/'+route+`${param?'/'+param:''}`, {
			method: 'GET',
		})
		.then(res => {
			if (!res.ok) {
				throw res;
			}
			if(res.headers.get('content-type')?.includes('application/json')) {
				return res.json()
			} else if(res.headers.get('content-type')?.includes('text/csv')) {
				return res.text()
			} else {
				return res
			}
		})
		.catch((error: Error) => {
			//throw error;
			return Promise.reject(error);
		});
	};

	useEffect(() => {
		setTitle(documentTitle+':\u0020Python\u0020API');
	}, [documentTitle]);

	useEffect(() => {
		if(todos) {
			setTodosLoading(false)
		}
		if(fibonacci) {
			setFibonacciLoading(false)
		}
		if(nycCounty) {
			setNycCountyLoading(false)
		}
		if(bBReplacementCost) {
			setBBReplacementCostLoading(false)
		}
		if(bridgeRatingsFull) {
			setBridgeRatingsFullLoading(false)
		}
		if(bridgeRatings) {
			setBridgeRatingsLoading(false)
		}
	}, [todos, fibonacci, nycCounty, bBReplacementCost, bridgeRatingsFull, bridgeRatings]);

	// revisit TS typing here later
	function addCurrencyCommas(amount: any) {
		if(amount.length > 0 || amount > 0) {
			return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		} else {
			return '0';
		}
	};

	return (
		<>
			<Head>
				<title>{ !title ? documentTitle : title }</title>
			</Head>

			<div className="container">
				{/* ---------------------------------------------- */}

				<h1 className="mt-4 mb-3">Python API</h1>

				{/* ---------------------------------------------- */}

				<div className="bg-color-ivory container-padding-border-radius-1 overflow-wrap-break-word mb-5">

					<div className="mb-3">
						<Button
							type="button"
							className={`btn-primary btn-md ${todosLoading ? 'disabled' : ''}`}
							onClick={() => {
								setTodosLoading(true)
								fetchData('todosapi/todos')
									.then(data => {
										setTodos(data);
									})
									.catch(error => {
										setTodos({ error: 'Error when attempting to fetch resource.' })
										console.error(error);
									})
							}}
							buttonText="Get The Todos"
						/>

						{todosLoading && (
							<div className="mt-1 ml-2">
								<Loading text="Loading" />
							</div>
						)}

						{!todosLoading && (
							<>
								{todos && todos.error && (
									<div className="mt-1 ml-2">
										<div className="bg-warn-red container-padding-radius-10 width-fit-content text-color-white">
											Error when attempting to fetch resource.
										</div>
									</div>
								)}

								{todos && todos.data && (
									<div className="mt-1 ml-2 container-padding-border-1 width-fit-content">
										<pre>
											{JSON.stringify(todos.data)}
										</pre>
									</div>
								)}
							</>
						)}
					</div>

					<div className="mb-3">
						<Button
							type="button"
							className={`btn-primary btn-md ${fibonacciLoading ? 'disabled' : ''}`}
							onClick={() => {
								setFibonacciLoading(true)
								fetchData('fibonacci', '200')
									.then(data => {
										setFibonacci(data);
									})
									.catch(error => {
										setFibonacci({ error: 'Error when attempting to fetch resource.' })
										console.error(error);
									})
							}}
							buttonText="Get Fibonacci Length 200"
						/>
						{fibonacciLoading && (
							<div className="mt-1 ml-2">
								<Loading text="Loading" />
							</div>
						)}

						{!fibonacciLoading && (
							<>
								{fibonacci && fibonacci.error && (
									<div className="mt-1 ml-2">
										<div className="bg-warn-red container-padding-radius-10 width-fit-content text-color-white">
											Error when attempting to fetch resource.
										</div>
									</div>
								)}

								{fibonacci && fibonacci.data && (
									<div className="mt-1 ml-2 container-padding-border-1 width-fit-content">
										<pre>
											{fibonacci.data.join(' ')}
										</pre>
									</div>
								)}
							</>
						)}
					</div>

					<div className="mb-3">
						<Button
							type="button"
							className={`btn-primary btn-md ${nycCountyLoading ? 'disabled' : ''}`}
							onClick={() => {
								setNycCountyLoading(true)
								fetchData('nyccounty', '1')
									.then(data => {
										setNycCounty(data);
									})
									.catch(error => {
										setNycCounty({ error: 'Error when attempting to fetch resource.' })
										console.error(error);
									})
							}}
							buttonText="Get NYC County"
						/>
						{nycCountyLoading && (
							<div className="mt-1 ml-2">
								<Loading text="Loading" />
							</div>
						)}

						{!nycCountyLoading && (
							<>
								{nycCounty && nycCounty.error && (
									<div className="mt-1 ml-2">
										<div className="bg-warn-red container-padding-radius-10 width-fit-content text-color-white">
											Error when attempting to fetch resource.
										</div>
									</div>
								)}

								{nycCounty && nycCounty.data && (
									<div className="mt-1 ml-2 container-padding-border-1 width-fit-content">
										<pre>
											{nycCounty.data}
										</pre>
									</div>
								)}
							</>
						)}
					</div>

					<div className="mb-3">
						<Button
							type="button"
							className={`btn-primary btn-md ${bBReplacementCostLoading ? 'disabled' : ''}`}
							onClick={() => {
								setBBReplacementCostLoading(true)
								fetchData('botosssgetobject/brooklynbridgesreplacementcost')
									.then(data => {
										setBBReplacementCost(data);
									})
									.catch(error => {
										setBBReplacementCost({ error: 'Error when attempting to fetch resource.' })
										console.error(error);
									})
							}}
							buttonText="Get Brooklyn's Bridges Replacement Cost"
						/>
						{bBReplacementCostLoading && (
							<div className="mt-1 ml-2">
								<Loading text="Loading" />
							</div>
						)}

						{!bBReplacementCostLoading && (
							<>
								{bBReplacementCost && bBReplacementCost.error && (
									<div className="mt-1 ml-2">
										<div className="bg-warn-red container-padding-radius-10 width-fit-content text-color-white">
											Error when attempting to fetch resource.
										</div>
									</div>
								)}

								{bBReplacementCost && bBReplacementCost.data && (
									<div className="mt-1 ml-2 container-padding-border-1 width-fit-content">
										<pre>
											${addCurrencyCommas(bBReplacementCost.data)}
										</pre>
									</div>
								)}
							</>
						)}
					</div>

					<div className="mb-3">
						<Button
							type="button"
							className={`btn-primary btn-md ${bridgeRatingsFullLoading ? 'disabled' : ''}`}
							onClick={() => {
								setBridgeRatingsFullLoading(true)
								fetchData('botosssgetobject/streambridgeratings')
									.then(data => {
										setBridgeRatingsFull({'data': data});
									})
									.catch(error => {
										setBridgeRatingsFull({ error: 'Error when attempting to fetch resource.' })
										console.error(error);
									})
							}}
							buttonText="Get Full Bridge Ratings"
						/>

						{bridgeRatingsFullLoading && (
							<div className="mt-1 ml-2">
								<Loading text="Loading" />
							</div>
						)}

						{!bridgeRatingsFullLoading && (
							<>
								{bridgeRatingsFull && bridgeRatingsFull.error && (
									<div className="mt-1 ml-2">
										<div className="bg-warn-red container-padding-radius-10 width-fit-content text-color-white">
											Error when attempting to fetch resource.
										</div>
									</div>
								)}

								{bridgeRatingsFull && bridgeRatingsFull.data && (
									<div className="mt-1 ml-2 container-padding-border-1 container-overflow-height-small">
										<pre>
											{bridgeRatingsFull.data}
										</pre>
									</div>
								)}
							</>
						)}
					</div>

					<div className="mb-3">
						<Button
							type="button"
							className={`btn-primary btn-md ${bridgeRatingsLoading ? 'disabled' : ''}`}
							onClick={() => {
								setBridgeRatingsLoading(true)
								fetchData('botosssgetobject/bridgeratings')
									.then(data => {
										setBridgeRatings({'data': data});
									})
									.catch(error => {
										setBridgeRatings({ 'error': 'Error when attempting to fetch resource.' })
										console.error(error);
									})
							}}
							buttonText="Get Bridge Ratings"
						/>

						{bridgeRatingsLoading && (
							<div className="mt-1 ml-2">
								<Loading text="Loading" />
							</div>
						)}

						{!bridgeRatingsLoading && (
							<>
								{bridgeRatings && bridgeRatings.error && (
									<div className="mt-1 ml-2">
										<div className="bg-warn-red container-padding-radius-10 width-fit-content text-color-white">
											Error when attempting to fetch resource.
										</div>
									</div>
								)}

								{bridgeRatings && bridgeRatings.data && (
									<div className="mt-1 ml-2 container-border-1-radius-1 container-overflow-height-small">
										<div>
											<div className="table-bridge-ratings-wrapper">
												<div className="table-bridge-ratings-csv-repeat-6 table-bridge-ratings-display">
													{bridgeRatingsCsvGridColumnHeader(bridgeRatings)}
													{bridgeRatingsCsvGridRowItems(bridgeRatings)}
												</div>
											</div>
										</div>
									</div>
								)}
							</>
						)}
					</div>

				</div>
			</div>
		</>
	);
};

export default PythonAPI;
