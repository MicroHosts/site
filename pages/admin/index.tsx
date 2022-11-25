import {ReactElement} from "react";
import AdminLayout from "@/layouts/Admin";
import React from "react";
import ChartOrders from "@/admin/charts/chartsorders";
import Dashboard from "@/admin/dashboard/Dashboard";
import { IncomeInDay, IncomeInMonth, OrdersInDay, OrdersInWeek } from "@/models/stats";

function Index({incomeInDay, incomeInMonth, ordersInDay, ordersForWeek}:any): ReactElement {
    return(
        <div className="flex flex-col mt-2 w-full">
            <Dashboard incomeInDay={incomeInDay} incomeInMonth={incomeInMonth} ordersInDay={ordersInDay}/>
            <ChartOrders orders={ordersForWeek}/>
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


export const getStaticProps = async () => {
    const incomeInDay = await IncomeInDay();
    const incomeInMonth = await IncomeInMonth();
    const ordersInDay = await OrdersInDay();
    const ordersForWeek = await OrdersInWeek();
    return {
        props: {
            incomeInDay,
            incomeInMonth,
            ordersInDay,
            ordersForWeek
        }
    }
}

export default Index

