import useSWR from "swr";
import {signOut} from "next-auth/react";

//TODO переделать на global state
const fetcher = async(url:string) => {
    const res = await fetch(url)

    if (!res.ok) {
        const error = new Error('An error occurred while fetching the data.')
        // Добавление дополнительной информации в объект ошибки.
        // error.info = await res.json()
        // error.status = res.status
        if(res.status === 404){
            await signOut({callbackUrl: "/", redirect: true})
            return;
        }
        throw error
      }
    return res.json()
}


function useUser () {
    const { data, error } = useSWR(`/api/user`, fetcher)
    console.log(error)
    return {
        user: data,
        isLoading: !error && !data,
        isError: error
    }
}


export default useUser;
