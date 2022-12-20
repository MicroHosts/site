import useData from "@/components/hooks/useData";
import usePaginate from "@/components/hooks/usePaginate";
import Pagination from "@/components/pagination/pagiation";
import Search from "@/components/search/search";
import { useState } from "react";
import { mutate } from "swr";
import BuyCategory from "../BuyCategory";
import BuyCard from "./card/BuyCard";
import BuyCardError from "./card/BuyCardError";
import BuyCardSkeleton from "./card/BuyCardSkeleton";

export default function BuyList() {
    const url = "/api/admin/buylogs";
    const { data, isLoading, isError } = useData(url);
    const { pageCount, currentPage, setCurrentPage } = usePaginate(data);
    const [search, setSearch] = useState("");

    return (
        <div className="overflow-x-auto relative w-full">
            <Search search={search} setSearch={setSearch} onClick={async (e: any) => {
                e.preventDefault();
                if (search.length > 0) {
                    await mutate(url, async (data: any) => {
                        data = await fetch(`${url}?search=${search}`).then(res => res.json());
                        return data;
                    }, false);
                } else {
                    await mutate(url);
                }
            }} />
            <BuyCategory search={search} page={currentPage} url={url}/>
            <table
                className="w-full text-sm text-left text-gray-400">
                <thead
                    className="text-xs uppercase text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Название
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Тип
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Цена
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Статус
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Оплачено до
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading && (
                        <>
                            <BuyCardSkeleton />
                            <BuyCardSkeleton />
                            <BuyCardSkeleton />
                            <BuyCardSkeleton />
                        </>
                    )}
                    {isError && (
                        <BuyCardError />
                    )}
                    {data && data.logs.map((buy: any, index: number) => (
                        <BuyCard buy={buy} key={index} />
                    ))}
                </tbody>
            </table>
            <div className="mt-12">
                <Pagination pageCount={pageCount} setPage={async (page: number) => {
                    if (page - 1 < 0) return;
                    if (page > pageCount) return;
                    setCurrentPage(page);
                    if (search.length > 0) {
                        await mutate(url, async (data: any) => {
                            data = await fetch(`${url}?page=${page}&search=${search}`).then(res => res.json());
                            return data;
                        }, false);
                    } else {
                        await mutate(url, async (data: any) => {
                            data = await fetch(`${url}?page=${page}`).then(res => res.json());
                            return data;
                        }, false);
                    }
                }} currentPage={currentPage} />
            </div>
        </div>
    )
}