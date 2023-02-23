export function fetchData<T = any>(url: string, config?: string): Promise<T> {
	return fetch('/'+url+`${config?'/'+config:''}`, {
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
