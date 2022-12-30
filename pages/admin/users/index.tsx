import {ReactElement} from "react";
import AdminLayout from "@/layouts/Admin";
import UserList from "@/pages/admin/users/UserList";
import {getSession} from "next-auth/react";
import {checkAdmin} from "@/utils/user";


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

export default Users

