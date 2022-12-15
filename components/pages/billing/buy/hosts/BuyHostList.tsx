import useData from "@/components/hooks/useData"
import usePaginate from "@/components/hooks/usePaginate";
import Pagination from "@/components/pagination/pagiation";
import { mutate } from "swr";
import BuyHostCard from "./card/BuyHostCard";
import BuyHostCardError from "./card/BuyHostCardError";
import BuyHostCardSkeleton from "./card/BuyHostSkeleton";

export default function BuyHostList() {
    const url = "/api/hosts";
    const { data, isLoading, isError } = useData(url);
    const { pageCount, currentPage, setCurrentPage } = usePaginate(data);

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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {data && data.hosts.map((host: any) => (
                    <BuyHostCard host={host} key={host.id} />
                ))}
            </div>
            <div className="mt-12">
                <Pagination pageCount={pageCount} setPage={async (page: number) => {
                    if (page - 1 < 0) return;
                    if (page > pageCount) return;
                    setCurrentPage(page);
                    await mutate(url, async (data: any) => {
                        data = await fetch(`${url}?page=${page}`).then(res => res.json());
                        return data;
                    }, false);

                }} currentPage={currentPage} />
            </div>
        </>

    )
}
