import CardStats from "@/components/cards/CardStats";

export default function Dashboard(){
    return(
        <div className="flex flex-row justify-center [&>*]:mr-4">
            <CardStats
                statSubtitle="Доход за день"
                statTitle="350,897р"
                statArrow="down"
                statPercent="3.48"
                statPercentColor="text-red-500"
                statDescripiron="чем вчера"
                statIconName="far fa-chart-bar"
                statIconColor="bg-red-500"
            />
            <CardStats
                statSubtitle="Доход за месяц"
                statTitle="350,897"
                statArrow="up"
                statPercent="3.48"
                statPercentColor="text-emerald-500"
                statDescripiron="чем месяц назад"
                statIconName="far fa-chart-bar"
                statIconColor="bg-green-500"
            />
            <CardStats
                statSubtitle="Заказов за день"
                statTitle="350,897"
                statArrow="up"
                statPercent="3.48"
                statPercentColor="text-emerald-500"
                statDescripiron="чем вчера"
                statIconName="far fa-chart-bar"
                statIconColor="bg-blue-500"
            />
        </div>
    )
}
