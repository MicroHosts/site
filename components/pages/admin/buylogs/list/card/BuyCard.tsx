import Router from "next/router"

export default function BuyCard({buy}:any) {
    const date = new Date(buy.rentDate)
    const dateformat = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
    return (
        <tr className="border-b border-gray-700">
            <th scope="row"
                className="py-4 px-6 font-medium whitespace-nowrap text-white">
                    {buy.name}
            </th>
            <td className="py-4 px-6">
                {buy.type === "HOST" ? 'Хостинг' : 'Сервис'}
            </td>
            <td className="py-4 px-6">
                {buy.price} руб
            </td>
            <td className="py-4 px-6">
                {buy.status === "BUY" ? 'Кулпен' : 'Продлено'}
            </td>
            <td className="py-4 pl-6">
                {dateformat}
            </td>
        </tr>

    )
}
