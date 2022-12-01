import useData from "@/components/hooks/useData";
import UserCard from "./UserCard";
import UserCardError from "./UserCardError";
import UserCardSkeleton from "./UserCardSkeleton";

export default function UserList() {
    const {data, isLoading, isError} = useData("/api/admin/user");
    return (
        <div className="overflow-x-auto relative w-full">
            <table
                className="w-full text-sm text-left text-gray-400">
                <thead
                    className="text-xs uppercase text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Имя пользователя
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Почта
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Статус
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Управление
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading && (
                        <>
                            <UserCardSkeleton />
                            <UserCardSkeleton />
                            <UserCardSkeleton />
                            <UserCardSkeleton />
                        </>
                    )}
                    {isError && (
                        <UserCardError />
                    )}
                    {data && data.map((user: any, index: number) => (
                        <UserCard user={user} key={index} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}