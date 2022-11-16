import {TabType} from "../../types/tab";
import { Tab } from '@headlessui/react'
import {Fragment} from "react";
import TabHeader from "./TabHeader";

export default function TabList({tabs}:{tabs: TabType[]}){
    return(
        <Tab.Group>
            <Tab.List className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 border-gray-700 text-gray-400 justify-center">
                {tabs.map((tab) => (
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <TabHeader selected={selected} name={tab.name}/>
                        )}
                    </Tab>
                ))}
            </Tab.List>
            <Tab.Panels>
                {tabs.map((tab) => (
                    <Tab.Panel>
                        {tab.component}
                    </Tab.Panel>
                ))}
            </Tab.Panels>
        </Tab.Group>
    )
}