import useUserData from '@/components/hooks/useUserData';
import { userState } from '@/store/user';
import {useRecoilValue} from 'recoil';
import ServiceCard from './ServiceCard';
import ServiceCardError from './ServiceCardError';
import ServiceCardSkeleton from './ServiceCardSkeleton';

const ServiceList = () => {
    const user:any = useRecoilValue(userState);
    const { data, isLoading, isError } = useUserData("/api/user/service", user.id);
    return(
        <div className="overflow-x-auto relative">
            <table
                className="w-full text-sm text-left text-gray-400">
                <thead
                    className="text-xs uppercase text-gray-400">
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
                {isLoading && (
                    <>
                        <ServiceCardSkeleton />
                        <ServiceCardSkeleton />
                        <ServiceCardSkeleton />
                    </>
                )}
                {isError && (
                    <ServiceCardError/>
                )}
                {data && data.map((service: any) => (
                    <ServiceCard service={service} key={service.id}/>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default ServiceList;
