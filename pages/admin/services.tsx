import { ReactElement } from "react";
import AdminLayout from "@/layouts/Admin";
import ServiceList from "@/admin/services/ServiceList";
import HostList from "@/admin/hosts/HostList";
import TabList from "@/components/tab/TabList";

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

export default Services

