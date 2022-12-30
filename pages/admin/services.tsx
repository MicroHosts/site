import { ReactElement } from "react";
import AdminLayout from "@/layouts/Admin";
import ServiceList from "@/admin/services/ServiceList";
import HostList from "@/admin/hosts/HostList";
import TabList from "@/components/tab/TabList";
import {getSession} from "next-auth/react";
import {checkAdmin} from "@/utils/util";
import {IncomeInDay, IncomeInMonth, OrdersInDay, OrdersInWeek} from "@/models/stats";

const tabs = [
    {
        name: "Хосты",
        component: <HostList/>
    },
    {
        name: "Услуги",
        component: <ServiceList/>
    },
]

function Services() {
    return (
        <div className="w-full mx-auto md:ml-4">
            <div>
                <TabList tabs={tabs}/>
            </div>
        </div>
    )
}

Services.getLayout = function getLayout(page: ReactElement) {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}

export const getServerSideProps = async (context:any) => {
    const { req } = context;
    const session = await getSession({ req });
    const check = await checkAdmin(session, req);
    if(!check){
        return {
            redirect: { destination: "/" },
        };
    }
    return {
        props: {
        }
    }
}

export default Services

