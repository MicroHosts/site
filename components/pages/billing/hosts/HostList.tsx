import HostCard from "./card/HostCard";
import HostCardSkeleton from "./card/HostCardSkeleton";
import { HostUser } from "@/types/host";
import useData from "@/components/hooks/useData";
import Pagination from "@/components/pagination/pagiation";
import { mutate } from "swr";
import HostCardError from "./card/HostCardErrors";
import usePaginate from "@/components/hooks/usePaginate";

const HostList = () => {
    const url = '/api/user/host/';
    const { data, isLoading, isError } = useData(url);
    const { pageCount, currentPage, setCurrentPage } = usePaginate(data);

    return (
        <div className="relative w-full">
            <table
                className="w-full text-sm text-left text-gray-400">
                <thead
                    className="text-xs uppercase text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Хост
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Цена в месяц
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Оплатить до
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Управление
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading && (
                        <>
                            <HostCardSkeleton />
                            <HostCardSkeleton />
                            <HostCardSkeleton />
                            <HostCardSkeleton />
                        </>
                    )}
                    {isError && (
                        <HostCardError />
                    )}
                    {data && data.map((host: HostUser) => (
                        <HostCard host={host} />
                    ))}
                </tbody>
            </table>
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
        </div>
    )
}

export default HostList;
