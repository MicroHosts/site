import {classNames} from "../../utils/utils";
import { Tab } from '@headlessui/react'
import ServiceList from "../../components/billing/services/ServiceList";
import NoPayList from "../../components/billing/nopay/NoPayList";
import {Fragment, ReactElement} from "react";
import BillingLayout from "../../components/billing/billingLayout";
import HostList from "../../components/billing/hosts/HostList";

const Billing = () =>{
    return(
                    <div className="w-full mx-auto md:ml-4">
                       <div>
                           Мои заказы
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
                                    <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={classNames(
                                                    selected
                                                        ? 'text-indigo-600 dark:border-indigo-600 dark:text-indigo-400'
                                                        : 'hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300',
                                                    'inline-block p-4 rounded-t-lg text-base')
                                                }
                                            >Неоплаченные</button>
                                        )}</Tab>
                                </Tab.List>
                                <Tab.Panels>
                                    <Tab.Panel>
                                         <HostList/>
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        <ServiceList/>
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        <NoPayList/>
                                    </Tab.Panel>
                                </Tab.Panels>
                            </Tab.Group>
                        </div>
                    </div>
    )
}

Billing.getLayout = function getLayout(page: ReactElement) {
    // @ts-ignore
    return (
      <BillingLayout>
        {page}
      </BillingLayout>
    )
}


export default Billing;
