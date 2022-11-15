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

function useUserInfo (id:string) {
    const { data, error } = useSWR(['/api/user/info/', id], fetcher)
    return {
        info: data,
        isLoading: !error && !data,
        isError: error
    }
}


export default useUserInfo;
