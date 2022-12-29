import useSWRInfinite from 'swr/infinite';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// data: an array of fetch response values of each page
// error: error thrown by fetcher (or undefined)
// isLoading: error: error thrown by fetcher (or undefined)
// isValidating: if there's a request or revalidation loading
// mutate(data?, options?): function to mutate the cached data
// mutate: same as useSWR's bound mutate function but manipulates the data array
// size: the number of pages that will be fetched and returned
// setSize: set the number of pages that need to be fetched

export const usePaginationTypicodeComments = () => {
	const { data, error, size, setSize } = useSWRInfinite(
		(index: number) => {
			return `https://jsonplaceholder.typicode.com/comments?_page=${index + 1}&_limit=40`},
			fetcher,
			{
				revalidateIfStale: false,
				revalidateOnFocus: false,
				revalidateOnReconnect: false,
			}
		);

	const comments = data ? data.flat(1) : [];

	const isFetchingMore = (!data && !error) || (size > 0 && data && typeof data[size - 1] === 'undefined');

	const allDataLoaded = (data && data[data.length - 1]?.length < 40);

	return {
		comments,
		error,
		isFetchingMore,
		size,
		setSize,
		allDataLoaded,
	};
};
