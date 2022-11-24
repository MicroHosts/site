import useSWR from "swr";

const fetcher = async(url:string) => {
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error('An error occurred while fetching the data.')
    }
    return res.json()
}


function useData (url:string) {
    const { data, error } = useSWR(url, fetcher)
    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}


export default useData;
