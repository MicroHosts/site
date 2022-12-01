import useData from "@/components/hooks/useData"
import BuyHostCard from "./BuyHostCard";
import BuyHostCardError from "./BuyHostCardError";
import BuyHostCardSkeleton from "./BuyHostSkeleton";

export default function BuyHostList() {
    const { data, isLoading, isError } = useData("/api/user/host");

    return (
        <>
            {isLoading && (
                <>
                    <BuyHostCardSkeleton />
                    <BuyHostCardSkeleton />
                    <BuyHostCardSkeleton />
                    <BuyHostCardSkeleton />

                </>
            )}
            {isError && (
                <BuyHostCardError />
            )}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
                {data && data.map((host: any) => (
                    <BuyHostCard host={host} key={host.id} />
                ))}

            </div>
        </>

    )
}