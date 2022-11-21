import {ReactElement} from "react";
import AdminLayout from "@/layouts/Admin";


function Services() {
    return(
        <div>
            asdasd
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

