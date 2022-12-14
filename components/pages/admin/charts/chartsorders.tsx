import React from "react";
import Chart from "chart.js";

export default function ChartOrders({ orders }: any) {
        React.useEffect(() => {
            const labels = orders.map((order: any, index: any) => (
                order.day +" (" +(new Date().getDate()-index)+ "." + (new Date().getMonth() + 1) + ")"
                ));
            const data = orders.map((order: any) => order.orders);    
            let config = {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: "Оплаченные заказы",
                            backgroundColor: "#4a5568",
                            borderColor: "#4a5568",
                            data: data,
                            fill: false,
                            barThickness: 8,
                        },
                    ],
                },
                options: {
                    maintainAspectRatio: false,
                    responsive: true,
                    title: {
                        display: false,
                        text: "Orders Chart",
                    },
                    tooltips: {
                        mode: "index",
                        intersect: false,
                    },
                    hover: {
                        mode: "nearest",
                        intersect: true,
                    },
                    legend: {
                        labels: {
                            fontColor: "rgb(255,255,255)",
                        },
                        align: "end",
                        position: "bottom",
                    },
                    scales: {
                        xAxes: [
                            {
                                display: false,
                                scaleLabel: {
                                    display: true,
                                    labelString: "Month",
                                },
                                gridLines: {
                                    borderDash: [2],
                                    borderDashOffset: [2],
                                    color: "rgba(237,241,243,0.3)",
                                    zeroLineColor: "rgba(243,243,243,0.3)",
                                    zeroLineBorderDash: [2],
                                    zeroLineBorderDashOffset: [2],
                                },
                            },
                        ],
                        yAxes: [
                            {
                                display: true,
                                scaleLabel: {
                                    display: false,
                                    labelString: "Value",
                                },
                                gridLines: {
                                    borderDash: [2],
                                    drawBorder: false,
                                    borderDashOffset: [2],
                                    color: "rgba(33, 37, 41, 0.2)",
                                    zeroLineColor: "rgba(33, 37, 41, 0.15)",
                                    zeroLineBorderDash: [2],
                                    zeroLineBorderDashOffset: [2],
                                },
                            },
                        ],
                    },
                },
            };
            let ctx = document.getElementById("bar-chart").getContext("2d");
            window.myBar = new Chart(ctx, config);
        }, []);

    return (
        <>
            <div className="mt-8 relative flex flex-col min-w-0 break-words bg-zinc-800 w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <h6 className="uppercase text-white mb-1 text-xs font-semibold">
                                Заказы за последние 7 дней
                            </h6>
                        </div>
                    </div>
                </div>
                <div className="p-4 flex-auto">
                    {/* Chart */}
                    <div className="relative h-350-px">
                        <canvas id="bar-chart"></canvas>
                    </div>
                </div>
            </div>
        </>
    )
}
