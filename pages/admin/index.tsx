import {ReactElement} from "react";
import AdminLayout from "@/layouts/Admin";
import React from "react";
import ChartOrders from "@/admin/charts/chartsorders";
import Dashboard from "@/admin/dashboard/Dashboard";

function Index() {
    return(
        <div className="flex flex-col mt-2 w-full">
            <Dashboard/>
            <ChartOrders/>
        </div>
    )
}

Index.getLayout = function getLayout(page: ReactElement) {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}

export default Index

