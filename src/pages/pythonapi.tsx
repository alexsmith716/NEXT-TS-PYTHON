import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Loading from '../components/Loading';
import Button from '../components/Button';

interface PythonAPIProps {
	documentTitle?: string;
};

const PythonAPI: NextPage<PythonAPIProps> = ({ documentTitle }) => {
	const [title, setTitle] = useState('');
	const [queryError, setQueryError] = useState(false);
	const [todos, setTodos] = useState([]);
	const [nycCounty, setNycCounty] = useState([]);

	const fetchData = async () => {
		const todosRes = await fetch("/todosapi/todos");
		const todos = await todosRes.json();
		console.log('>>> PythonAPI > todos: ', todos);
		setTodos(todos.data);

		const countyRes = await fetch("/nyccounty/4");
		const county = await countyRes.json();
		console.log('>>> PythonAPI > county: ', county);
		setNycCounty(county.data);
	};

	useEffect(() => {
		fetchData();
	}, []);

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
							className="btn-danger btn-md"
							onClick={() => console.log('>>> client.extract(): ', client.extract())}
							buttonText="Cache"
						/>
					</div>

					<div className="mb-3">
						<Button
							type="button"
							className="btn-primary btn-md"
							onClick={() => {
								addAuthor({ variables: { name: 'Elmer Fudd' } });
							}}
							buttonText="AddAuthor"
						/>
					</div>

				</div>
			</div>
		</>
	);
};

export default PythonAPI;
