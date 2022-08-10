import { DataSource } from 'apollo-datasource';
import axios from 'axios';
import { print } from 'graphql/language/printer';

import {
	MutateAddAuthor,
} from './queries/queriesAPI.graphql';

export class StrawberryAPI extends DataSource {
	constructor() {
		super();
	};

	graphqlClientPOST({ query = '', variables = {}, }) {
		const params = {
			query: query,
			variables: { ...variables },
		};
		return axios({
			method: 'post',
			url: 'http://127.0.0.1:8000/graphql',
			data: params,
			headers: {
				'Accept': 'application/json',
			},
		})
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				console.error(error);
				return Promise.reject();
			});
	};

	async MutateAddAuthor(name: string) {
		try {
			const response = await this.graphqlClientPOST({
				query: print(MutateAddAuthor),
				variables: {
					name: name,
				},
			});
			const {data: { addAuthor },} = response;
			return addAuthor;
		} catch (error) {
			console.error(error);
			return Promise.reject();
		}
	};
};
