import { useEffect, useState } from "react";
import CreateServiceModal from "../modals/CreateServiceModal";
import ServiceCard from "@/admin/services/ServiceCard";
import ServiceCardSkeleton from "@/admin/services/ServiceCardSkeleton";
import { useRecoilValue } from "recoil";
import { editServiceOpen } from "@/store/service";
import EditServiceModal from "@/admin/modals/EditServiceModal";
import useData from "@/components/hooks/useData";
import Search from "@/components/search/search";
import { mutate } from "swr";
import Pagination from "@/components/pagination/pagiation";
import usePaginate from "@/components/hooks/usePaginate";

export default function ServiceList() {
    const url = "/api/admin/service";
    const [isOpen, setIsOpen] = useState(false);
    const { data, isLoading, isError } = useData(url);
    const { pageCount, currentPage, setCurrentPage } = usePaginate(data);
    const [search, setSearch] = useState("");
    const open = useRecoilValue(editServiceOpen)

    return (
        <div className="overflow-x-auto relative w-full">
            <div className="flex justify-center">
                <button onClick={() => setIsOpen(true)}
                    className="focus:outline-none text-white cus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-green-600 hover:bg-green-700 focus:ring-green-800">Добавить
                </button>
            </div>
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
            <CreateServiceModal open={isOpen} setOpen={setIsOpen} />
            {open && <EditServiceModal />}
            <table
                className="w-full text-sm text-left text-gray-400">
                <thead
                    className="text-xs uppercase text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Название
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Цена в месяц
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Редактирование
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading && (
                        <>
                            <ServiceCardSkeleton />
                            <ServiceCardSkeleton />
                            <ServiceCardSkeleton />
                            <ServiceCardSkeleton />
                        </>
                    )}
                    {isError && (
                        <tr className="border-b dark:border-gray-700">
                            <th scope="row"
                                className="py-4 px-6 font-medium whitespace-nowrap text-white">
                                Ошибка
                            </th>
                            <td className="py-4 px-6">
                                Ошибка
                            </td>
                            <td className="py-4 pl-6">
                            </td>
                        </tr>
                    )}
                    {data && data.services.map((service: any, index: number) => (
                        <ServiceCard service={service} key={index} />
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
