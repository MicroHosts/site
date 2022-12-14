const ServiceCard = ({service}:any) => {
    return(
        <tr className="border-b border-gray-700">
            <th scope="row"
                className="py-4 px-6 font-medium whitespace-nowrap text-white">
                {service.name}
            </th>
            <td className="py-4 px-6">
                {service.price} руб
            </td>
        </tr>
    )
}



export default ServiceCard
