import styles from "../../styles/Home.module.css";
import Head from "next/head";
import {classNames} from "../../utils/utils";
import Link from "next/link";
import { Tab } from '@headlessui/react'
import NoPayList from "../../components/billing/nopay/NoPayList";
import {Fragment} from "react";
import Header from "../../components/billing/header/Header";
import BuyHostCard from "../../components/billing/buy/hosts/BuyHostCard";
import BuyServiceCard from "../../components/billing/buy/services/BuyServiceCard";
import Image from "next/image";
import logo from "../../assets/logo.svg";
import {getSession} from "next-auth/react";

export default function Billing() {
  return(
      <div className={styles.container}>
        <Head>
          <title>Биллинг</title>
          <link rel="icon" href="/favicon.ico"/>
        </Head>
        <div>
          <nav className="md:px-2 py-2.5">
            <div className="flex flex-wrap justify-between items-center mx-auto mt-4 md:mt-0">
              <Link href="/" className="flex items-center">
                <Image className="w-12 h-12 mr-2"
                       src={logo} alt="logo"/>
                <span
                    className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MicroHost</span>
              </Link>
              <div className={classNames( "md:block md:w-auto")}>
                <Link href={"/billing"}
                      className="md:ml-0 ml-4 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg md:text-lg px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800">Выйти
                </Link>
              </div>
            </div>
          </nav>
          <div className="md:flex">
            <Header/>
            <div className="w-full mx-auto md:ml-4">
              <div>
                Доступные услуги
              </div>
              <div>
                <Tab.Group>
                  <Tab.List className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 justify-center">
                    <Tab as={Fragment}>
                      {({ selected }) => (
                          <button
                              className={classNames(
                                  selected
                                      ? 'text-indigo-600 dark:border-indigo-600 dark:text-indigo-400'
                                      : 'hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300',
                                  'inline-block p-4 rounded-t-lg text-base')
                              }
                          >Хосты</button>
                      )}
                    </Tab>
                    <Tab as={Fragment}>
                      {({ selected }) => (
                          <button
                              className={classNames(
                                  selected
                                      ? 'text-indigo-600 dark:border-indigo-600 dark:text-indigo-400'
                                      : 'hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300',
                                  'inline-block p-4 rounded-t-lg text-base')
                              }
                          >Услуги</button>
                      )}</Tab>
                  </Tab.List>
                  <Tab.Panels>
                    <Tab.Panel>
                      <div>
                        <BuyHostCard/>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel>
                      <BuyServiceCard/>
                    </Tab.Panel>
                    <Tab.Panel>
                      <NoPayList/>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

// export async function getServerSideProps(context:any) {
//   const { req } = context;
//   const session = await getSession({ req });
//
//   if (!session) {
//     return {
//       redirect: { destination: "/auth/login" },
//     };
//   }
//
//   return {
//     props: {}
//   }
// }