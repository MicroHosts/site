import useData from "@/components/hooks/useData";
import usePaginate from "@/components/hooks/usePaginate";
import Pagination from "@/components/pagination/pagiation";
import Search from "@/components/search/search";
import { useState } from "react";
import { mutate } from "swr";
import UserCard from "./UserCard";
import UserCardError from "./UserCardError";
import UserCardSkeleton from "./UserCardSkeleton";

export default function UserList() {
    const url = "/api/admin/user";
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
            <table
                className="w-full text-sm text-left text-gray-400">
                <thead
                    className="text-xs uppercase text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Имя пользователя
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Почта
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Статус
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Управление
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading && (
                        <>
                            <UserCardSkeleton />
                            <UserCardSkeleton />
                            <UserCardSkeleton />
                            <UserCardSkeleton />
                        </>
                    )}
                    {isError && (
                        <UserCardError />
                    )}
                    {data && data.users.map((user: any, index: number) => (
                        <UserCard user={user} key={index} />
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