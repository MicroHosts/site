import { useState } from "react";
import CreateHostModal from "@/admin/modals/CreateHostModal";
import HostCardSkeleton from "@/admin/hosts/HostCardSkeleton";
import HostCard from "@/admin/hosts/HostCard";
import EditHostModal from "@/admin/modals/EditHostModal";
import { useRecoilValue } from "recoil";
import { editHostOpen } from "@/store/host";
import useData from "@/components/hooks/useData";
import { HostUser } from "@/types/host";

export default function HostList() {
    const { data, isLoading, isError } = useData("/api/admin/host");
    console.log(data)
    const open = useRecoilValue(editHostOpen)

    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="overflow-x-auto relative w-full">
            <div className="flex justify-center">
                <button onClick={() => setIsOpen(true)}
                    className="focus:outline-none text-white cus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-green-600 hover:bg-green-700 focus:ring-green-800">Добавить
                </button>
            </div>
            <CreateHostModal setOpen={setIsOpen} open={isOpen} />
            {open && <EditHostModal />}
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
                            <HostCardSkeleton />
                            <HostCardSkeleton />
                            <HostCardSkeleton />
                            <HostCardSkeleton />
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
                            <td className="py-4 px-6">
                                Ошибка
                            </td>
                            <td className="py-4 pl-6">
                            </td>
                        </tr>
                    )}
                    {data && data.hosts.map((host: any, index: number) => (
                        <HostCard host={host} key={index} />
                    ))}
                </tbody>
            </table>

        </div>
    )
}
