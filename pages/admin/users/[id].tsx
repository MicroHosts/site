import { ReactElement } from "react";
import AdminLayout from "@/layouts/Admin";
import UserInfo from "@/pages/admin/user/UserInfo";
import HostUserList from "@/pages/admin/user/hosts/HostUserList";
import ServiceUserList from "@/pages/admin/user/services/ServicesUserList";
import {getSession} from "next-auth/react";
import prisma from "@/lib/prismadb";
import {checkAdmin} from "@/utils/user";

function Users({ user }: any) {
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


export async function getServerSideProps(context: any){
    const { params, req } = context;
    const session = await getSession({ req });
    if(!session){
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            },
        }
    }
    const check = await checkAdmin(session, req);
    if(!check){
        return {
            redirect: { destination: "/" },
        };
    }
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

const getUserById = async (id: string) => {
    return await prisma.user.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            email: true,
            emailVerified: true,
            blocked: true,
            hosts: {
                select: {
                    id: true,
                    host: {
                        select: {
                            id: true,
                            name: true,
                            vimid: true,
                            price: true,
                        }
                    },
                    rentDate: true,
                }
            },
            balance: {
                select: {
                    amount: true,
                }
            },
            info: {
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    second_name: true,
                    phone_number: true,
                }
            },
            services: {
                select: {
                    id: true,
                    rentDate: true,
                    service: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                        }
                    },
                }
            }
        }
    });
}

export default Users

