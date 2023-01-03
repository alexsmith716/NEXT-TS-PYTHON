import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
//import Loading from '../components/Loading';
//import Button from '../components/Button';

//import fetcher from '../utils/fetchData';
//import { useGithubGists } from '../hooks/useSWRGithubGists';

interface SwrGithubGistsProps {
	documentTitle?: string;
};

const SwrGithubGists: NextPage<SwrGithubGistsProps> = ({ documentTitle }) => {
	//const {
	//	gists,
	//	error,
	//	isLoading,
	//	isFetchingMore,
	//	allDataLoaded,
	//} = useGithubGists();

	const [title, setTitle] = useState('');

	useEffect(() => {
		setTitle(documentTitle+':\u0020SWR\u0020Github\u0020Gists');
	}, [documentTitle]);

	//const handleSetGistsClick = () => {
	//	//
	//};

	return (
		<>
			<Head>
				<title>{ !title ? documentTitle : title }</title>
			</Head>

			<div className="container">
				{/* ---------------------------------------------- */}

				<h1 className="mt-4 mb-3">SWR Github Gists</h1>

				<div className="bg-color-ivory container-padding-border-radius-1 mb-5">

					<div className="container-padding-border-radius-2">
						<div className="comment-grid-container">
							<div className="bg-color-cadetblue container-padding-radius-10">
								<b>Description:</b>A new Gist was created here.<br/>
								<b>URL:</b>https://api.github.com/gists/eb05ff0305bd<br/>
								<b>Comments:</b>2<br/>
								<b>Comments Url:</b>https://api.github.com/gists/eb05ff0305bd<br/>
								<b>Owner:</b>A new Gist with interesting information.<br/>
								<b>Created at:</b>Tue Jan 3 10:31 AM
							</div>
						</div>
					</div>

				</div>
			</div>
		</>
	);
};

export default SwrGithubGists;
