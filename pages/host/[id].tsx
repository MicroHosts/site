'use client';
import BillingLayout from "@/layouts/Billing"
import {checkIsUserHost, getAllHosts, getAvailableHostsAll, getHostById, getHosts} from "@/models/hosts";
import { getUserByEmail } from "@/models/user";
import { errorToast, successToast } from "@/utils/utils";
import { unstable_getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import {ReactElement, useEffect, useRef, useState} from "react"
import { FaMemory } from "react-icons/fa";
import { FiCpu } from "react-icons/fi";
import { MdStorage } from "react-icons/md";
import { mutate } from "swr";
import {VncScreen} from "react-vnc";
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(() => import('@/components/vnc/VNCViewer'), {
    loading: () => <p>Loading...</p>,
    ssr: false,
});

function Host({ host }: any) {
    console.log(host)

    return (
        <div>
            <div>
                Выключить
                Включить
                Перезапустить
                Отключить
            </div>
            <DynamicComponent url={host.vnc_url}/>
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

export async function getStaticPaths() {
    const ids = await getAllHosts();
    const paths = ids.map((id: any) => ({
        params: { id: id.id }
    }))
    return {
        paths: paths,
        fallback: false, // can also be true or 'blocking'
    }
}

export async function getStaticProps(context: any) {
    const { req, params } = context;
    // console.log(context)
    // const session = await getSession({ req });
    // console.log(session)
    // if (!session) {
    //     return {
    //         redirect: { destination: "/" },
    //     };
    // }
    // const user = await getUserByEmail(session.user?.email);
    //
    // if(user === null) {
    //     return {
    //         redirect: { destination: "/" },
    //     };
    // }
    // console.log(params.id)
    // if(user.role === "ADMIN"){
    //     const host = await getHostById(params.id);
    //     return {
    //         props: {
    //             host: host
    //         }
    //     }
    // }
    // const host1 = await checkIsUserHost(user.id, params.id);
    // if(host1 === null) {
    //     return {
    //         redirect: { destination: "/billing" },
    //     };
    // }
    const host = await getHostById(params.id);
    return {
        props: {
            host: host
        }
    }
}

export default Host
