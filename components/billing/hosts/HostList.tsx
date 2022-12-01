import useUserData from "@/components/hooks/useUserData";
import HostCard from "./HostCard";
import { useRecoilValue } from 'recoil'
import { userState } from "@/store/user";
import HostCardSkeleton from "./HostCardSkeleton";
import { HostUser } from "@/types/host";

const HostList = () => {
    const user = useRecoilValue(userState);
    const { data, isLoading, isError } = useUserData("/api/user/host", user.id);
    return (
        <div className="overflow-x-auto relative">
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
                            Оплатить до
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
                    {data && data.map((host: HostUser) => (
                        <HostCard host={host} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default HostList;
