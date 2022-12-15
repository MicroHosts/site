const NoPayServiceCard = ({service}:any) => {
    return(
        <tr className="border-b border-gray-700">
            <th scope="row"
                className="py-4 px-6 font-medium whitespace-nowrap text-white">
                {service.name}
            </th>
            <td className="py-4 px-6">
                Услуга
            </td>
            <td className="py-4 px-6">
                {service.price} руб
            </td>
            <td className="py-4 px-6">
                <button type="button"
                        className="focus:ring-4 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800 text-base text-white">Оплатить
                </button>
            </td>
        </tr>
    )
}



export default NoPayServiceCard
