import useSWR from "swr";

const fetcher = async (url, queryParams = '') => {
    const res = await fetch(`${url}?id=${queryParams}`)
    
    if (!res.ok) {
        const error = new Error('An error occurred while fetching the data.')
        // Добавление дополнительной информации в объект ошибки.
        error.info = await res.json()
        error.status = res.status
        throw error
      }
    return res.json()
}

function useUserData (url:string, id:string) {
    const { data, error } = useSWR([url, id], fetcher)
    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}


export default useUserData;
