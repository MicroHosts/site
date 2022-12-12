import BuyServiceCard from "./BuyServiceCard";
import BuyServiceCardError from "./BuyServiceCardError";
import BuyServiceCardSkeleton from "./BuyServiceCardSkeleton";
import { useRecoilValue } from 'recoil'
import { userState } from "@/store/user";
import Pagination from "@/components/pagination/pagiation";
import usePaginate from "@/components/hooks/usePaginate";
import useData from "@/components/hooks/useData";
import { mutate } from "swr";

export default function BuyServiceList() {
    const url = "/api/services";
    const user = useRecoilValue(userState);
    const { data, isLoading, isError } = useData(url);
    const { pageCount, currentPage, setCurrentPage } = usePaginate(data);

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
                <BuyServiceCardError />
            )}
            {data && data.services.map((service: any) => (
                <BuyServiceCard service={service} key={service.id} />
            ))}
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