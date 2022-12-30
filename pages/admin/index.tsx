import {ReactElement} from "react";
import AdminLayout from "@/layouts/Admin";
import React from "react";
import Dashboard from "@/admin/dashboard/Dashboard";
import { IncomeInDay, IncomeInMonth, OrdersInDay, OrdersInWeek } from "@/models/stats";
import dynamic from "next/dynamic";
import BuyList from "@/components/pages/admin/buylogs/list/BuyList";
import {getSession} from "next-auth/react";
import {getUserByEmail} from "@/models/user";
import {checkAdmin} from "@/utils/util";

const DynamicComponent = dynamic(() => import('@/admin/charts/chartsorders'), {
    loading: () => <p>Loading...</p>,
    ssr: false,
});

function Index({incomeInDay, incomeInMonth, ordersInDay, ordersForWeek}:any): ReactElement {
    return(
        <div className="flex flex-col mt-2 w-full">
            <Dashboard incomeInDay={incomeInDay} incomeInMonth={incomeInMonth} ordersInDay={ordersInDay}/>
            <DynamicComponent orders={ordersForWeek}/>
            <BuyList/>
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


export const getServerSideProps = async (context:any) => {
    const { req } = context;
    const session = await getSession({ req });
    const check = await checkAdmin(session, req);
    if(!check){
        return {
            redirect: { destination: "/" },
        };
    }
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

