import useSWR from "swr";

const fetcher = (url, queryParams = '') => {
    console.log(`${url}${queryParams}`)
    fetch(`${url}?id=${queryParams}`).then((res) => res.json())
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
