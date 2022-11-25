import { ReactElement } from "react";
import AdminLayout from "@/layouts/Admin";
import UserList from "@/components/admin/users/UserList";
import { getUserAllId, getUserById } from "@/models/user";
import UserInfo from "@/components/admin/user/UserInfo";
import HostUserList from "@/components/admin/user/hosts/HostUserList";
import ServiceUserList from "@/components/admin/user/services/ServicesUserList";


function Users({ user }: any) {
    console.log(user)
    return (
        <div className="container mx-auto">
            <div className="flex justify-between flex-col w-full">
                <UserInfo user={user}/>
                <HostUserList hosts={user.hosts} />
                <ServiceUserList services={user.services} />
            </div>
        </div>

    )
}

Users.getLayout = function getLayout(page: ReactElement) {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}

export async function getStaticPaths() {
    const ids = await getUserAllId();
    console.log(ids)
    const paths = ids.map((id: any) => ({
        params: { id: id.id }
    }))
    return {
        paths: paths,
        fallback: false, // can also be true or 'blocking'
    }
}

export async function getStaticProps(context: any) {
    const { params } = context;
    const user = await getUserById(params.id);
    const hosts = user?.hosts.map((host) => ({
        ...host,
        rentDate: host.rentDate.toISOString(),
    }))
    const services = user?.services.map((service) => ({
        ...service,
        rentDate: service.rentDate.toISOString(),
    }))
    return {
        props: {
            user: ({...user, 
            hosts: user?.hosts? hosts : [],
            services: user?.services? services : [],})
        }
    }
}

export default Users

