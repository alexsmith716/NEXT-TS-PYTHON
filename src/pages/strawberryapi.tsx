import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useMutation, useApolloClient } from '@apollo/client';
import Loading from '../components/Loading';
import Button from '../components/Button';
import { MutateAddAuthorDocument } from '../apollo/generated/react-apollo';

interface StrawberryAPIProps {
	documentTitle?: string;
};

const StrawberryAPI: NextPage<StrawberryAPIProps> = ({ documentTitle }) => {
	const [title, setTitle] = useState('');
	const [queryError, setQueryError] = useState(false);

	useEffect(() => {
		setTitle(documentTitle+':\u0020Strawberry\u0020API');
	}, [documentTitle]);

	const client = useApolloClient();

	const [addAuthor, {
			loading: addAuthorLOADING,
			error: addAuthorERROR,
			data: addAuthorDATA,
		},
	] = useMutation(MutateAddAuthorDocument, {
		onError: (addAuthorERROR) => {
			console.log('>>> StrawberryAPI > useMutation > addAuthorDocumentERROR: ', addAuthorERROR);
			setQueryError(true);
		},
		onCompleted: (addAuthorDATA) => {
			console.log('>>> StrawberryAPI > useMutation > addAuthorDocumentDATA: ', addAuthorDATA);
			setQueryError(false);
		},
	});

	return (
		<>
			<Head>
				<title>{ !title ? documentTitle : title }</title>
			</Head>

			<div className="container">
				{/* ---------------------------------------------- */}

				<h1 className="mt-4 mb-3">Strawberry API</h1>

				{/* ---------------------------------------------- */}

				<div className="bg-color-ivory container-padding-border-radius-1 overflow-wrap-break-word mb-5">

					{addAuthorLOADING && (
						<div className="flex-column align-items-center">
							<div className="text-center">
								<div className="container-padding-radius-10">
									<Loading text="Loading" />
								</div>
							</div>
						</div>
					)}

					{addAuthorERROR && (
						<div className="flex-column align-items-center mb-3">
							<div className="text-center">
								<div className="bg-warn-red container-padding-radius-10 text-color-white">
									Error when attempting to fetch resource.
								</div>
							</div>
						</div>
					)}

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

					{queryError && addAuthorDATA && (
						<div className="flex-column align-items-center">
							<div className="text-center">
								<div className="bg-warn-red container-padding-radius-10 text-color-white">
									Error when attempting to fetch resource.
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default StrawberryAPI;
