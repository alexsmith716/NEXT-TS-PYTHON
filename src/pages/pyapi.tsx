import type { NextPage } from 'next';
import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import Button from '../components/Button';
import Loading from '../components/Loading';
import { fetchData } from '../utils/fetchAPI';
import { TodosType, FibonacciType, NycCountyType, BridgeRatingsFullType, BridgeRatingsType, CurrencyCommasType } from '../types';
import { addCurrencyCommas } from '../utils/addCurrencyCommas';
import { bridgeRatingsCsvGridColumnHeader, bridgeRatingsCsvGridRowItems } from '../components/BridgeRatingsCsvGrid';

interface PythonAPIProps {
	documentTitle?: string;
};

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
	const [bBReplacementCost, setBBReplacementCost] = useState<CurrencyCommasType>();
	const [bridgeRatingsFull, setBridgeRatingsFull] = useState<BridgeRatingsFullType>();
	const [bridgeRatings, setBridgeRatings] = useState<BridgeRatingsType>();

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

	function createBridgeRatingsFull(reponse: BridgeRatingsFullType) {
		return reponse?.data;
	};

	// will be using SWR caching for `bBReplacementCost`, `bridgeRatingsFull` and `bridgeRatings`
	const createBRatingsFull = useMemo(() => createBridgeRatingsFull(bridgeRatingsFull!), [bridgeRatingsFull]);
	const bridgeRCGColumnHeader = useMemo(() => bridgeRatingsCsvGridColumnHeader(bridgeRatings!), [bridgeRatings]);
	const bridgeRCGRowItems = useMemo(() => bridgeRatingsCsvGridRowItems(bridgeRatings!), [bridgeRatings]);

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
										setTodos({ 'error': 'Error when attempting to fetch resource.' })
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

					{/* ============================================== */}

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
										setFibonacci({ 'error': 'Error when attempting to fetch resource.' })
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

					{/* ============================================== */}

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
										setNycCounty({ 'error': 'Error when attempting to fetch resource.' })
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

					{/* ============================================== */}

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
										setBBReplacementCost({ 'error': 'Error when attempting to fetch resource.' })
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
											${addCurrencyCommas(bBReplacementCost)}
										</pre>
									</div>
								)}
							</>
						)}
					</div>

					{/* ============================================== */}

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
										setBridgeRatingsFull({ 'error': 'Error when attempting to fetch resource.' })
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
											{createBRatingsFull}
										</pre>
									</div>
								)}
							</>
						)}
					</div>

					{/* ============================================== */}

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
													{bridgeRCGColumnHeader}
													{bridgeRCGRowItems}
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
