

const NoPayHostCard = ({ host }: any) => {
    const date = new Date(host.rentDate)
    const dateformat = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
    return (
        <tr className="border-b dark:border-gray-700">
            <th scope="row"
                className="py-4 px-6 font-medium whitespace-nowrap text-white">
                {host.host.name}
            </th>
            <td className="py-4 px-6">
                Хост
            </td>
            <td className="py-4 px-6">
                {host.host.price} руб
            </td>
            <td className="py-4 px-6">
                {dateformat}
            </td>
            <td className="py-4 px-6">
                <button type="button"
                    className="focus:ring-4 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800 text-base text-white">Оплатить
                </button>
            </td>
        </tr>
    )
}



export default NoPayHostCard
