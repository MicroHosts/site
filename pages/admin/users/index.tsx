import {ReactElement} from "react";
import AdminLayout from "@/layouts/Admin";
import UserList from "@/components/admin/users/UserList";


function Users() {
    return(
        <UserList/>
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

