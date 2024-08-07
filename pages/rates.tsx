import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import HeaderMain from "@/components/pages/main/HeaderMain";
import FooterMain from "@/components/pages/main/FooterMain";

function Rates() {
    return (
        <div className={styles.container}>
            <Head>
                <title>MicroHost - Тарифы</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <HeaderMain />
                <div className="container mx-auto ">
                    <div className="mt-4 bg-zinc-800 mx-auto">
                        <div className="p-4 mx-auto">
                            <div className="text-center md:text-4xl text-2xl mb-4">
                                Тарифы
                            </div>

                            <div className="md:text-lg text-base mt-4 mx-12">
                                <div>
                                    На основании этого документа ввести корректировки в работу по созданию хостинга и его тарифов.
                                    Линейка тарифов на основном сервере (Intel Xeon 2690v2)            Локация:  Россия, Санкт-Петербург

                                </div>
                                <div></div>
                                <div>
                                    Название тарифа<br/>
                                    Технические характеристики<br/>
                                    Стоимость (руб.)
                                </div>
                                <ol className="mx-4">
                                    <br/>
                                    <li>SPB-E5-1</li>
                                    <ol>
                                        <li>5 vCPU / DDR3 8ГБ ОЗУ, 50gb nvme / 100Мбит/сек</li>
                                        <li>599 руб / в месяц</li>
                                    </ol>
                                    <br/>
                                    <li>SPB-E5-2</li>
                                    <ol >
                                        <li>8 vCPU / DDR3 12ГБ ОЗУ, 80gb nvme / 100Мбит/сек</li>
                                        <li>899 руб / в месяц</li>
                                    </ol>
                                    <br/>
                                    <li>SPB-E5-3</li>
                                    <ol >
                                        <li>15 vCPU / DDR3 16ГБ ОЗУ, 120gb nvme / 100Мбит/сек</li>
                                        <li>1000 руб / в месяц</li>
                                    </ol>
                                    <br/>
                                    <li>SPB-E5-4</li>
                                    <ol >
                                        <li>20vCPU / DDR3 20ГБ ОЗУ, 150 nvme / 100Мбит/сек</li>
                                        <li>1300 руб / в месяц</li>
                                    </ol>
                                </ol>
                                <br />
                                Основатель  "Microhost" самозанятый Немцов Игорь Андреевич. ИНН: 784813407368
                            </div>
                        </div>
                    </div>
                    <FooterMain />
                </div>
            </div>
        </div>
    );
}


export default Rates;
