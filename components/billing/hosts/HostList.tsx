import HostCard from "./HostCard";

const HostList = () => {
    return(
        <div className="overflow-x-auto relative">
            <table
                className="w-full text-sm text-left text-gray-400">
                <thead
                    className="text-xs text-gray-700 uppercase dark:text-gray-400">
                <tr>
                    <th scope="col" className="py-3 px-6">
                        Хост
                    </th>
                    <th scope="col" className="py-3 px-6">
                        Цена в месяц
                    </th>
                    <th scope="col" className="py-3 px-6">
                        Оплатить до
                    </th>
                    <th scope="col" className="py-3 px-6">
                        Управление
                    </th>
                </tr>
                </thead>
                <tbody>
                    <HostCard/>
                    <HostCard/>
                </tbody>
            </table>
        </div>
    )
}

export default HostList;
