import BillingLayout from "@/layouts/Billing"
import { getAllHosts, getHostById } from "@/models/hosts";
import { ReactElement } from "react"
import dynamic from "next/dynamic";
import EndHost from "@/components/buttons/EndHost";
import StartHost from "@/components/buttons/StartHost";
import RestartHost from "@/components/buttons/RestartHost";
import StopHost from "@/components/buttons/StopHost";

const DynamicComponent = dynamic(() => import('@/components/vnc/VNCViewer'), {
    loading: () => <p>Loading...</p>,
    ssr: false,
});

function Host({ host }: any) {
    return (
        <div>
            <div>
                <StartHost id={host.id} />
                <RestartHost id={host.id} />
                <StopHost id={host.id} />
                <EndHost id={host.id} />
            </div>
            <DynamicComponent url={host.vnc_url} password={host.passwordVnc} id={host.id}/>
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
    const { params } = context;
    const host = await getHostById(params.id);
    return {
        props: {
            host: host
        }
    }
}

export default Host
