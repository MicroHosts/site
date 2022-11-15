import useSWR from "swr";

const fetcher = async (url:string, queryParams = '') => {
    const res = await fetch(`${url}?id=${queryParams}&category=service`)
    
    if (!res.ok) {
        const error = new Error('An error occurred while fetching the data.')
        // Добавление дополнительной информации в объект ошибки.
        // error.info = await res.json()
        // error.status = res.status
        throw error
      }
    return res.json()
}

function useUserService (id:string) {
    const { data, error } = useSWR(['/api/user/service/', id], fetcher)
    return {
        services: data,
        isLoading: !error && !data,
        isError: error
    }
}


export default useUserService;
