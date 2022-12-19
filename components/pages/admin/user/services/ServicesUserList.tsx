import Link from "next/link";
import {errorToast, successToast} from "@/utils/utils";

export default function ServiceUserList({services}:any) {
    return(
        <div className="overflow-x-auto relative w-full mt-24">
        <table
            className="w-full text-sm text-left text-gray-400">
            <thead
                className="text-xs uppercase text-gray-400">
            <tr>
                <th scope="col" className="py-3 px-6">
                    Услуга
                </th>
                <th scope="col" className="py-3 px-6">
                    Цена в месяц
                </th>
                <th scope="col" className="py-3 px-6">
                    Оплата
                </th>
                <th scope="col" className="py-3 px-6">
                    Забрать
                </th>
            </tr>
            </thead>
            <tbody>
                {services && services.map((service: any, index: number) => (
                    <ServiceCard service={service} key={index} />
                ))}
            </tbody>
        </table>
    </div>
    )
}


function ServiceCard({service}:any) {
    const date = new Date(service.rentDate)
    const dateformat = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
    return(
        <tr className="border-b border-gray-700">
            <th scope="row"
                className="py-4 px-6 font-medium whitespace-nowrap text-white">
                    {service.service.name}
            </th>
            <td className="py-4 px-6">
                {service.service.price}
            </td>
            <td className="py-4 px-6">
                {dateformat}
            </td>
            <td className="py-4 pl-6">
                <button type="button"
                    onClick={async() => {
                        const res = await fetch(`/api/admin/user/service/${service.id}/take`, {
                          method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        })
                        if(res.status === 200) {
                            successToast('Услуга успешно забрана')
                        }else{
                            errorToast('Ошибка')
                        }
                    }}
                    className="focus:ring-4 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-red-800 text-base">Забрать
                </button>
            </td>
        </tr>
    )
}
