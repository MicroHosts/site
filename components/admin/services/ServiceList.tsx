import { useState } from "react";
import CreateServiceModal from "../modals/CreateServiceModal";
import HostCard from "./HostCard";

export default function ServiceList() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="overflow-x-auto relative w-full">
            <div className="flex justify-center">
                <button onClick={() => setIsOpen(true)}
                    className="focus:outline-none text-white cus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-green-600 hover:bg-green-700 focus:ring-green-800">Добавить
                </button>
            </div>
            <CreateServiceModal open={isOpen} setOpen={setIsOpen}/>
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
                    <HostCard />
                </tbody>
            </table>
        </div>
    )
}