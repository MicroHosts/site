import useSWR from "swr";

//TODO переделать на global state
const fetcher = async(url:string) => {
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error('An error occurred while fetching the data.')
    }
    return res.json()
}


function useService () {
    const { data, error } = useSWR(`/api/service`, fetcher)
    return {
        services: data,
        isLoading: !error && !data,
        isError: error
    }
}


export default useService;
