import useData from '@/components/hooks/useData';
import usePaginate from '@/components/hooks/usePaginate';
import Pagination from '@/components/pagination/pagiation';
import { mutate } from 'swr';
import ServiceCard from './ServiceCard';
import ServiceCardError from './ServiceCardError';
import ServiceCardSkeleton from './ServiceCardSkeleton';

const ServiceList = () => {
    const url = "/api/user/service"
    const { data, isLoading, isError } = useData(url);
    const { pageCount, currentPage, setCurrentPage } = usePaginate(data);

    return (
        <div className="relative w-full">
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
                        <ServiceCardError />
                    )}
                    {data && data.services.map((service: any) => (
                        <ServiceCard service={service} key={service.id} />
                    ))}
                </tbody>
            </table>
            <div className="mt-12">
                <Pagination pageCount={pageCount} setPage={async (page: number) => {
                    if (page - 1 < 0) return;
                    if (page > pageCount) return;
                    setCurrentPage(page);
                    await mutate(url, async (data: any) => {
                        data = await fetch(`${url}?page=${page}`).then(res => res.json());
                        return data;
                    }, false);
                }} currentPage={currentPage} />
            </div>
        </div>
    )
}

export default ServiceList;
