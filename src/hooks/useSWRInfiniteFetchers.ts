import useSWRInfinite from 'swr/infinite';

const fetchData = (url: string) => {
	return fetch(url)
		.then((res) => {
			if (!res.ok) {
				throw new Error('Network response error');
			}
			return res.json()
		})
		.catch((error: Error) => {
			throw error;
		});
}

// data: an array of fetch response values of each page
// error: error thrown by fetcher (or undefined)
// isLoading: if there's an ongoing request and no "loaded data". Fallback data and previous data are not considered "loaded data"
// isValidating: if there's a request or revalidation loading
// mutate(data?, options?): function to mutate the cached data
// mutate: same as useSWR's bound mutate function but manipulates the data array
// size: the number of pages that will be fetched and returned
// setSize: set the number of pages that need to be fetched

export const usePaginationTypicodeComments = () => {
	//isValidating
	const { data, error, isLoading, size, setSize } = useSWRInfinite(
		(index: number) => {
			return `https://jsonplaceholder.typicode.com/comments?_page=${index + 1}&_limit=40`},
			fetchData,
			{
				shouldRetryOnError: true, //retry when fetcher has an error
				revalidateIfStale: false, //automatically revalidate even if there is stale data
				revalidateOnFocus: false, //automatically revalidate when window gets focused
				revalidateOnReconnect: false, //automatically revalidate when the browser regains a network connection (via navigator.onLine)
				//refreshInterval: 40000, //automatically refetch data
				revalidateAll: false, //always try to revalidate all pages
				persistSize: true,
			}
		);

	const comments = data ? data.flat(1) : [];

	const isFetchingMore = (!data && !error) || (size > 0 && data && typeof data[size - 1] === 'undefined');

	const allDataLoaded = (data && data[data.length - 1]?.length < 40);

	return {
		comments,
		error,
		isLoading,
		isFetchingMore,
		size,
		setSize,
		allDataLoaded,
	};
};
