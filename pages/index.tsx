import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import HeaderMain from "@/components/pages/main/HeaderMain";
import FooterMain from "@/components/pages/main/FooterMain";

function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>MicroHost</title>
                <meta name="description" content="Microhost дешевые vps/vds" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <HeaderMain />
                <div className="container mx-auto md:pt-24">
                    <div className="mx-auto md:w-2/3">
                        <div className="text-center md:text-4xl text-2xl font-bold">
                            Лучший облачный хостинг
                            для любых задач
                        </div>
                        <Image src="/hero1.svg" alt={"hero"} width={1000} height={500} className="md:w-2/4 mx-auto mt-4" />
                    </div>
                    <div className="pt-12" id={"services"}>
                        <div className="text-center text-4xl font-bold">
                            Наши услуги
                        </div>
                        <div className="mt-4 bg-zinc-800 mx-auto">
                            <div className="p-4 mx-auto">
                                <div className="text-center md:text-4xl text-2xl mb-4">
                                    Виртуальные сервера
                                </div>
                                <div className="text-center md:text-2xl text-xl">
                                    Мощные процессоры, низкий пинг и низкие цены!
                                </div>
                                <div className="text-center md:text-lg text-base mt-4 md:w-2/3 mx-auto">
                                    Наши тарифы подойдут под множество задач,
                                    начиная от сайтов 1C-Битрикс, заканчивая
                                    большими игровыми серверами.
                                </div>
                                <div className="md:w-2/3 mx-auto">
                                    <div className="flex md:w-3/4 mt-12 mb-4 md:flex-row flex-col">
                                        <div
                                            className="border focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 md:mb-2 mb-6 text-white border-white mr-6 md:w-max w-full">Виртуализация
                                            KVM
                                        </div>
                                        <div
                                            className="border focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 text-white border-white md:w-max w-full">Процессоры
                                            от 4.9 ГГц
                                        </div>
                                    </div>
                                    <div
                                        className="border focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 text-white border-white md:w-max w-full">
                                        Низкий пинг
                                    </div>
                                    {/* <div className="mt-6 text-center">
                                        от 380 руб/мес
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*<div className="text-center text-3xl font-bold mt-12" id="tarifs">*/}
                    {/*    Тарифы*/}
                    {/*</div>*/}
                    {/*/!* <div className="text-center text-xl mt-4">Процессор - Intel Xeon E5-2667v2</div> *!/*/}
                    {/*<div className="[&>*]:mt-4">*/}
                    {/*    /!*{hosts.map((host: any, index: number) => (*!/*/}
                    {/*    /!*    <VDSCard host={host} key={index} />*!/*/}
                    {/*    /!*))}*!/*/}
                    {/*</div>*/}
                    {/*<div className="flex justify-center mt-4">*/}
                    {/*    <Link type="button"*/}
                    {/*        href="/billing"*/}
                    {/*        className="focus:ring-4 focus:ring-blue-300 font-medium rounded-lg md:text-xl text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none">Посмотреть больше*/}
                    {/*    </Link>*/}
                    {/*</div>*/}
                    <div className="text-center text-3xl font-bold mt-12">
                        Почему мы?
                    </div>
                    <div className="grid md:grid-cols-2 gap-x-8 place-items-stretch gap-y-4 mt-12 mx-auto">
                        <div className="bg-zinc-800 mx-auto p-4 rounded w-full">
                            <div className="font-bold md:text-xl text-lg">
                                Быстрая поддержка
                            </div>
                            <div className="md:text-lg text-sm md:mt-0 mt-2">
                                Мы готовы предоставить Вам самую
                                качественую и бесплатную
                                поддержку. Установим ПО,
                                поможем с настройкой!
                            </div>
                        </div>
                        <div className="bg-zinc-800 mx-auto p-4 rounded w-full">
                            <div className="font-bold md:text-xl text-lg">
                                Высокий Uptime
                            </div>
                            <div className="md:text-lg text-sm md:mt-0 mt-2">
                                Мы максимально прикладываем
                                усилия, чтобы держать сервис на высоте.
                                Поэтому аптайм наших серверов - 99.983%
                            </div>
                        </div>
                        <div className="bg-zinc-800 mx-auto p-4 rounded w-full">
                            <div className="font-bold md:text-xl text-lg">
                                Низкий пинг
                            </div>
                            <div className="md:text-lg text-sm md:mt-0 mt-2">
                                Мы распологаемся в дате-центре
                                ММТС-9 в Москве.
                            </div>
                        </div>
                        <div className="bg-zinc-800 mx-auto p-4 rounded w-full">
                            <div className="font-bold md:text-xl text-lg">
                                Низкие цены
                            </div>
                            <div className="md:text-lg text-sm md:mt-0 mt-2">
                                У нас одни из самых минимальных цен на рынке.
                            </div>
                        </div>
                    </div>
                    <div className="text-center text-3xl font-bold mt-12">
                        Остались вопросы?
                    </div>
                    <div className="text-center text-lg mt-4 md:w-1/3 mx-auto">
                        Если у Вас остались вопросы - смело пишите в
                        нашу группу Вконтакте, мы с радостью отметим
                        на любые Ваши вопрсоcы.
                    </div>
                    <FooterMain />
                </div>
            </div>
        </div>
    );
}


export default Home;
