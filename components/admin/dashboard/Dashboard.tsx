import CardStats from "@/components/cards/CardStats";

export default function Dashboard({incomeInDay, incomeInMonth, ordersInDay}:any) {
    console.log(incomeInMonth)
    return(
        <div className="flex flex-row justify-center [&>*]:mr-4">
            <CardStats
                statSubtitle="Доход за день"
                statTitle={incomeInDay.income+" ₽"}
                statArrow={incomeInDay.income > 0 ? "up" : "down"}
                statPercent={incomeInDay.percent+""}
                statPercentColor={incomeInDay.income > 0 ? "text-emerald-500" : "text-red-500"}
                statDescripiron="чем вчера"
                statIconName="far fa-chart-bar"
                statIconColor={incomeInDay.income > 0 ? "bg-green-500" : "bg-red-500"}
            />
            <CardStats
                statSubtitle="Доход за месяц"
                statTitle={incomeInMonth.income+" ₽"}
                statArrow={incomeInMonth.income>0?"up":"down"}
                statPercent={incomeInMonth.percent+""}
                statPercentColor={incomeInMonth.income > 0 ? "text-emerald-500" : "text-red-500"}
                statDescripiron="чем месяц назад"
                statIconName="far fa-chart-bar"
                statIconColor={incomeInMonth.income > 0 ? "bg-green-500" : "bg-red-500"}
            />
            <CardStats
                statSubtitle="Заказов за день"
                statTitle={ordersInDay.orders+""}
                statArrow={ordersInDay.orders>0?"up":"down"}
                statPercent={ordersInDay.percent+""}
                statPercentColor={ordersInDay.orders > 0 ? "text-emerald-500" : "text-red-500"}
                statDescripiron="чем вчера"
                statIconName="far fa-chart-bar"
                statIconColor={ordersInDay.orders > 0 ? "bg-green-500" : "bg-red-500"}
            />
        </div>
    )
}
