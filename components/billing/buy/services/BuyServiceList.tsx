import useUserData from "@/components/hooks/useUserData";
import BuyServiceCard from "./BuyServiceCard";
import BuyServiceCardError from "./BuyServiceCardError";
import BuyServiceCardSkeleton from "./BuyServiceCardSkeleton";
import {useRecoilValue} from 'recoil'
import { userState } from "@/store/user";

export default function BuyServiceList() {
    const user: any = useRecoilValue(userState);
    const { data, isLoading, isError } = useUserData("/api/user/avservice", user.id);
    console.log(data);
    return (
        <>
            {isLoading && (
                <>
                    <BuyServiceCardSkeleton />
                    <BuyServiceCardSkeleton />
                    <BuyServiceCardSkeleton />
                    <BuyServiceCardSkeleton />

                </>
            )}
            {isError && (
                <BuyServiceCardError/>
            )}
            {data && data.map((service: any) => (
                <BuyServiceCard service={service} key={service.id}/>
            ))}
        </>

    )
}