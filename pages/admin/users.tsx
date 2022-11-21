import {ReactElement} from "react";
import AdminLayout from "@/layouts/Admin";


function Users() {
    return(
        <div>
            asdasd
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

export default Users

