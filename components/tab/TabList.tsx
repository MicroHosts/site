import {TabType} from "@/types/tab";
import { Tab } from '@headlessui/react'
import TabHeader from "./TabHeader";

export default function TabList({tabs}:{tabs: TabType[]}){
    return(
        <Tab.Group>
            <Tab.List className="flex flex-wrap text-sm font-medium text-centerborder-b border-gray-700 text-gray-400 justify-center">
                {tabs.map((tab, index) => (
                    <Tab key={index}>
                        {({ selected }) => (
                            <TabHeader selected={selected} name={tab.name}/>
                        )}
                    </Tab>
                ))}
            </Tab.List>
            <Tab.Panels>
                {tabs.map((tab, index) => (
                    <Tab.Panel key={index}>
                        {tab.component}
                    </Tab.Panel>
                ))}
            </Tab.Panels>
        </Tab.Group>
    )
}
