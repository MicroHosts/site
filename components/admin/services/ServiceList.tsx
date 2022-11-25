import { useState } from "react";
import CreateServiceModal from "../modals/CreateServiceModal";
import ServiceCard from "@/admin/services/ServiceCard";
import ServiceCardSkeleton from "@/admin/services/ServiceCardSkeleton";
import {useRecoilValue} from "recoil";
import {editServiceOpen} from "@/store/service";
import EditServiceModal from "@/admin/modals/EditServiceModal";
import useData from "@/components/hooks/useData";

export default function ServiceList() {
    const [isOpen, setIsOpen] = useState(false);
    const {data, isLoading, isError} = useData("/api/admin/service");
    const open = useRecoilValue(editServiceOpen)

    return (
        <div className="overflow-x-auto relative w-full">
            <div className="flex justify-center">
                <button onClick={() => setIsOpen(true)}
                    className="focus:outline-none text-white cus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-green-600 hover:bg-green-700 focus:ring-green-800">Добавить
                </button>
            </div>
            <CreateServiceModal open={isOpen} setOpen={setIsOpen}/>
            {open && <EditServiceModal/>}
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
                        <ServiceCardSkeleton/>
                        <ServiceCardSkeleton/>
                        <ServiceCardSkeleton/>
                        <ServiceCardSkeleton/>
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
                {data && data.map((service:any, index:number) => (
                    <ServiceCard service={service} key={index}/>
                ))}
                </tbody>
            </table>
        </div>
    )
}
