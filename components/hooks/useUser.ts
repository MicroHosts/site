import useSWR from "swr";
import {signOut} from "next-auth/react";

const fetcher = (...args) => fetch(...args).then((res) => res.json())

function useUser () {
    const { data, error } = useSWR(`/api/user`, fetcher)
    if( !(!error && !data) && data == null){
        signOut({callbackUrl: "/", redirect: true})
    }
    return {
        user: data,
        isLoading: !error && !data,
        isError: error
    }
}


export default useUser;
