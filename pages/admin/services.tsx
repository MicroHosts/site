import { ReactElement } from "react";
import AdminLayout from "@/layouts/Admin";
import ServiceList from "@/admin/services/ServiceList";


function Services() {
    return (
            <ServiceList/>
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

