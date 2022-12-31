import BillingLayout from "@/layouts/Billing"
import {checkIsUserHost, getHostById, getHostByIdWithOutRent} from "@/models/hosts";
import { ReactElement, useEffect } from "react"
import dynamic from "next/dynamic";
import EndHost from "@/components/buttons/host/EndHost";
import StartHost from "@/components/buttons/host/StartHost";
import RestartHost from "@/components/buttons/host/RestartHost";
import StopHost from "@/components/buttons/host/StopHost";
import prisma from "@/lib/prismadb"
import Router from "next/router";
import {getSession} from "next-auth/react";
import {getUserByEmail} from "../../models/user";

// const DynamicComponent = dynamic(() => import('@/components/vnc/VNCViewer'), {
//     loading: () => <p>Loading...</p>,
//     ssr: false,
// });

function Host({ host }: any) {
    useEffect(() => {
        if(!host){
            Router.push('/billing/')
        }
    }, [])
    if(!host){
        return <div>
            Хост не найден. Идет переадрессация на главную страницу...
        </div>
    }

    return (
        <div>
            <div>
                <StartHost id={host.id} />
                <RestartHost id={host.id} />
                <StopHost id={host.id} />
                <EndHost id={host.id} />
            </div>
             {/*<DynamicComponent url={host.vnc_url} id={host.id}/>*/}
        </div>
    )

}

Host.getLayout = function getLayout(page: ReactElement) {
    return (
        <BillingLayout>
            {page}
        </BillingLayout>
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
    const user = await getUserByEmail(session.user?.email);
    if(!user){
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            },
        }
    }
    if(user.role !== "ADMIN"){
        const host1 = await checkIsUserHost(user.id, params.id as string);
        if(host1 === null) {
            return {
                redirect: {
                    destination: '/billing/',
                    permanent: false,
                },
            }
        }
    }
    const host = await getHostByIdWithOutRent(params.id);
    if(!host){
        return {
            redirect: {
                destination: '/billing/',
                permanent: false,
            },
        }
    }
    return {
        props: {
            host: host
        }
    }
}



export default Host
