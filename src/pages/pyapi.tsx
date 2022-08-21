import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
//import Loading from '../components/Loading';
import Button from '../components/Button';

interface PythonAPIProps {
	documentTitle?: string;
};

type TodosType = {
	data: Array<{
		id: number
		item: string
	}>
};

type FibonacciType = {
	data: Array<number>
};

type NycCountyType = {
	data: string
};

//type FetchDataErrorTypeException = {
//  error: string
//};

//type FetchDataErrorTypePyTypeHint = {
//  detail: Array<{
//    loc: Array<string>
//    msg: string
//    type: string
//  }>
//};

const PythonAPI: NextPage<PythonAPIProps> = ({ documentTitle }) => {
	const [title, setTitle] = useState("");
	//const [todos, setTodos] = useState([]);
	//const [nycCounty, setNycCounty] = useState("");
	//const [fibonacci, setFibonacci] = useState([]);

	function fetchData<T>(route: string, param: string): Promise<T> {
		return fetch('/'+route+'/'+param, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json'
			},
		})
		.then(async res => {
			if (!res.ok) {
				throw await res.json();
			}
			return res.json() as Promise<T>
		})
		.catch((error: Error) => {
			console.error(error);
			throw error;
			//return Promise.reject(error);
		});
	};

	useEffect(() => {
		setTitle(documentTitle+':\u0020Python\u0020API');
	}, [documentTitle]);

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
							className="btn-primary btn-md"
							onClick={() => {
								fetchData<TodosType>('todosapi', 'todos')
									.then(data => {
										console.log(data);
									})
									.catch(error => {
										console.error(error);
									})
							}}
							buttonText="todosapi"
						/>
					</div>

					<div className="mb-3">
						<Button
							type="button"
							className="btn-primary btn-md"
							onClick={() => {
								fetchData<FibonacciType>('fibonacci', '200')
									.then(data => {
										console.log(data);
									})
									.catch(error => {
										console.error(error);
									})
							}}
							buttonText="fibonacci"
						/>
					</div>

					<div className="mb-3">
						<Button
							type="button"
							className="btn-primary btn-md"
							onClick={() => {
								fetchData<NycCountyType>('nyccounty', '1')
									.then(data => {
										console.log(data);
									})
									.catch(error => {
										console.error(error);
									})
							}}
							buttonText="nyccounty"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default PythonAPI;
