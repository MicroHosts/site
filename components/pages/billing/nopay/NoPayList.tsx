import useData from "@/components/hooks/useData";
import HostCardSkeleton from "@/billing/hosts/card/HostCardSkeleton";
import HostCardError from "@/billing/hosts/card/HostCardErrors";
import {HostUser} from "@/types/host";
import HostCard from "@/billing/hosts/card/HostCard";
import NoPaySkeleton from "@/billing/nopay/card/NoPaySkeleton";
import NoPayCardError from "@/billing/nopay/card/NoPayCardError";
import NoPayServiceCard from "@/billing/nopay/card/NoPayServiceCard";
import NoPayHostCard from "@/billing/nopay/card/NoPayHostCard";

const NoPayList = () => {
    const url = '/api/user/nopay/';
    const { data, isLoading, isError } = useData(url);

    return(
        <div className="overflow-x-auto relative">
            <table
                className="w-full text-sm text-left text-gray-400">
                <thead
                    className="text-xs uppercase text-gray-400">
                <tr>
                    <th scope="col" className="py-3 px-6">
                        Название
                    </th>
                    <th scope="col" className="py-3 px-6">
                        Тип
                    </th>
                    <th scope="col" className="py-3 px-6">
                        Цена
                    </th>
                    <th scope="col" className="py-3 px-6">
                        Оплатить до
                    </th>
                </tr>
                </thead>
                <tbody>
                {isLoading && (
                    <>
                        <NoPaySkeleton />
                        <NoPaySkeleton />
                        <NoPaySkeleton />
                        <NoPaySkeleton />
                    </>
                )}
                {isError && (
                    <NoPayCardError />
                )}
                {data && data.services.map((service: any) => (
                    <NoPayServiceCard service={service} key={service.id}/>
                ))}
                {data && data.hosts.map((host: HostUser) => (
                    <NoPayHostCard host={host} key={host.id}/>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default NoPayList
