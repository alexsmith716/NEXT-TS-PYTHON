import type { NextPage, GetServerSideProps } from 'next';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import * as Styles from '../styles';
import { loadAboutCSVB } from '../redux/reducers/aboutCSVBSlice';
import Loading from '../components/Loading';
import { AboutCSVBPostType } from '../types';
import { wrapper, AppState } from '../redux/store';

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (): Promise<any> => {
	await store.dispatch(loadAboutCSVB())
		.catch((error: Error) => {
			console.error(error);
		})
});

interface AboutSsrPageProps {
	documentTitle: string;
};

const AboutSsr: NextPage<AboutSsrPageProps> = ({documentTitle}) => {
	let postsData;

	const loading = useSelector((state: AppState) => state.aboutCSVBReducer.loading);
	const loaded = useSelector((state: AppState) => state.aboutCSVBReducer.loaded);
	const aboutCSVBData = useSelector((state: AppState) => state.aboutCSVBReducer.aboutCSVBData);
	const [title, setTitle] = useState('');

	if(aboutCSVBData && !aboutCSVBData.error) {
		postsData = aboutCSVBData.props.posts;
	}

	useEffect(() => {
		setTitle(documentTitle+':\u0020About\u0020SSR');
	}, [documentTitle]);

	return (
		<>
			<Head>
				<title>{ !title ? documentTitle : title }</title>
			</Head>

			<div className="container">
				<h1 className="mt-4 mb-3">About SSR</h1>

				<div className="row-grid grid-six bg-lightskyblue-1 mb-5">
					<div className="col-grid mb-4">
						<Styles.AboutImageMain
							className="img-fluid rounded"
							src={'/about-750-450.png'}
							alt={''}
						/>
					</div>

					<div className="col-grid">
						<h2>About SSR</h2>
						<p>
							<b>This component utilizes &quot;getServerSideProps&quot; for SSR.</b>
						</p>
						<p>
							The below data must be fetched at request time. This could be due to the nature of the data or properties of the request (such as &quot;authorization&quot; headers or geo location).
						</p>

						{/* (>>>>>>>>>>>>>>>>>>>>>> LOADING >>>>>>>>>>>>>>>>>>>>>>>>) */}
						{loading && <Loading text="Loading" />}

						{/* (>>>>>>>>>>>>>>>>>>>>>> LOADED >>>>>>>>>>>>>>>>>>>>>>>>) */}
						{!loaded && aboutCSVBData && aboutCSVBData.error && (
							<p className="bg-warn-red container-padding-radius-10 text-color-white">
								{aboutCSVBData.error}
							</p>
						)}
						{loaded && aboutCSVBData && !aboutCSVBData.error && (
							<>{postsData.map((post: AboutCSVBPostType, key: number) => (
								<p data-testid="posts" key={key}>
									{post.body}
								</p>
							))}</>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default AboutSsr;
