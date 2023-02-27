import type { NextPage } from 'next';
import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../components/Button';
import Loading from '../components/Loading';
import { AppState } from '../redux/store';
import BridgeRatingsCsvGridColumnHeader from '../components/BridgeRatingsCsvGridColumnHeader';
import BridgeRatingsCsvGridRowItems from '../components/BridgeRatingsCsvGridRowItems';
import { fetchData } from '../utils/fetchAPI';
import { TodosType, FibonacciType, NycCountyType, BridgeRatingsFullType, } from '../types';
import { addCurrencyCommas } from '../utils/addCurrencyCommas';
import { loadBridgeRatingsFull } from '../redux/reducers/bridgeRatingsFullSlice';
import { loadBridgeRatingsReplacementCost } from '../redux/reducers/bridgeRatingsReplacementCostSlice';
import { loadBridgeRatings } from '../redux/reducers/bridgeRatingsSlice';

interface PythonAPIProps {
	documentTitle?: string;
};

const PythonAPI: NextPage<PythonAPIProps> = ({ documentTitle }) => {

	useEffect(() => {
		setTitle(documentTitle+':\u0020Python\u0020API');
	}, [documentTitle]);

	const [title, setTitle] = useState("");
	const dispatch = useDispatch();

	const loadingBridgeRatingsFull = useSelector((state: AppState) => state.bridgeRatingsFullReducer.loading);
	const loadedBridgeRatingsFull = useSelector((state: AppState) => state.bridgeRatingsFullReducer.loaded);
	const dataBridgeRatingsFull = useSelector((state: AppState) => state.bridgeRatingsFullReducer.data);

	const loadingBridgeRatingsReplacementCost = useSelector((state: AppState) => state.bridgeRatingsReplacementCostReducer.loading);
	const loadedBridgeRatingsReplacementCost = useSelector((state: AppState) => state.bridgeRatingsReplacementCostReducer.loaded);
	const dataBridgeRatingsReplacementCost = useSelector((state: AppState) => state.bridgeRatingsReplacementCostReducer.data);

	const loadingBridgeRatings = useSelector((state: AppState) => state.bridgeRatingsReducer.loading);
	const loadedBridgeRatings = useSelector((state: AppState) => state.bridgeRatingsReducer.loaded);
	const dataBridgeRatings = useSelector((state: AppState) => state.bridgeRatingsReducer.data);

	const [todosLoading, setTodosLoading] = useState(false);
	const [fibonacciLoading, setFibonacciLoading] = useState(false);
	const [nycCountyLoading, setNycCountyLoading] = useState(false);

	const [bBReplacementCostLoading, setBBReplacementCostLoading] = useState(false);
	const [bridgeRatingsFullLoading, setBridgeRatingsFullLoading] = useState(false);
	const [bridgeRatingsLoading, setBridgeRatingsLoading] = useState(false);

	const [todos, setTodos] = useState<TodosType>();
	const [fibonacci, setFibonacci] = useState<FibonacciType>();
	const [nycCounty, setNycCounty] = useState<NycCountyType>();

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
		if(dataBridgeRatingsFull) {
			setBridgeRatingsFullLoading(false)
		}
		if(dataBridgeRatingsReplacementCost) {
			setBBReplacementCostLoading(false)
		}
		if(dataBridgeRatings) {
			setBridgeRatingsLoading(false)
		}
	}, [ todos, fibonacci, nycCounty, dataBridgeRatingsFull, dataBridgeRatingsReplacementCost, dataBridgeRatings ]);

	function createBridgeRatingsFull(reponse: BridgeRatingsFullType) {
		return reponse?.data;
	};

	function dispatchLoadBridgeRatingsFull() {
		if(!loadingBridgeRatingsFull && !loadedBridgeRatingsFull) {
			setBridgeRatingsFullLoading(true)
			dispatch(loadBridgeRatingsFull())
				.then(() => {})
				.catch(() => {})
		}
	};

	function dispatchLoadBridgeRatingsReplacementCost() {
		if(!loadingBridgeRatingsReplacementCost && !loadedBridgeRatingsReplacementCost) {
			setBBReplacementCostLoading(true)
			dispatch(loadBridgeRatingsReplacementCost())
				.then(() => {})
				.catch(() => {})
		}
	};

	function dispatchLoadBridgeRatings() {
		if(!loadingBridgeRatings && !loadedBridgeRatings) {
			setBridgeRatingsLoading(true)
			dispatch(loadBridgeRatings())
				.then(() => {})
				.catch(() => {})
		}
	};

	const createBRatingsFull = useMemo(() => createBridgeRatingsFull(dataBridgeRatingsFull!), [dataBridgeRatingsFull]);
	const bridgeRCGColumnHeader = useMemo(() => BridgeRatingsCsvGridColumnHeader(dataBridgeRatings!), [dataBridgeRatings]);
	const bridgeRCGRowItems = useMemo(() => BridgeRatingsCsvGridRowItems(dataBridgeRatings!), [dataBridgeRatings]);

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

					{/* ============================================== */}

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
								console.log('>>>>>>>>>>>> PYAPI > dispatch > fetchBridgeRatingsReplacementCost > onClick 00000000000')
								dispatchLoadBridgeRatingsReplacementCost()
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
								{!loadedBridgeRatingsReplacementCost && dataBridgeRatingsReplacementCost && (
									<div className="mt-1 ml-2">
										<div className="bg-warn-red container-padding-radius-10 width-fit-content text-color-white">
											{dataBridgeRatingsReplacementCost.error}
										</div>
									</div>
								)}

								{loadedBridgeRatingsReplacementCost && dataBridgeRatingsReplacementCost && (
									<div className="mt-1 ml-2 container-padding-border-1 width-fit-content">
										<pre>
											${addCurrencyCommas(dataBridgeRatingsReplacementCost.data)}
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
								dispatchLoadBridgeRatingsFull()
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
								{!loadedBridgeRatingsFull && dataBridgeRatingsFull && (
									<div className="mt-1 ml-2">
										<div className="bg-warn-red container-padding-radius-10 width-fit-content text-color-white">
											{dataBridgeRatingsFull.error}
										</div>
									</div>
								)}

								{loadedBridgeRatingsFull && dataBridgeRatingsFull && (
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
								dispatchLoadBridgeRatings()
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
								{!loadedBridgeRatings && dataBridgeRatings && (
									<div className="mt-1 ml-2">
										<div className="bg-warn-red container-padding-radius-10 width-fit-content text-color-white">
											{dataBridgeRatings.error}
										</div>
									</div>
								)}

								{loadedBridgeRatings && dataBridgeRatings && (
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

					{/* ============================================== */}

				</div>
			</div>
		</>
	);
};

export default PythonAPI;
