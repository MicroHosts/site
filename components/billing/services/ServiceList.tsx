const ServiceList = () => {
    return(
        <div className="overflow-x-auto relative">
            <table
                className="w-full text-sm text-left text-gray-400">
                <thead
                    className="text-xs text-gray-700 uppercase dark:text-gray-400">
                <tr>
                    <th scope="col" className="py-3 px-6">
                        Услуга
                    </th>
                    <th scope="col" className="py-3 px-6">
                        Цена
                    </th>
                </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    )
}

export default ServiceList;
