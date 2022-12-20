import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { mutate } from 'swr'

const categories = [
    { name: 'Все', value: 'all' },
    { name: 'Хосты', value: 'host' },
    { name: 'Услуги', value: 'service' },
    { name: 'Продленные', value: 'expend' },
    { name: 'Купленные', value: 'buy' },
]

function BuyCategory({search, page, url}: {search: string, page: number, url: string}) {
    const [selected, setSelected] = useState(categories[0])

    return (
        <Listbox value={selected} onChange={async(text) => {
            await mutate(url, async (data: any) => {
                data = await fetch(`${url}?page=${page}&search=${search}&category=${text.value}`).then(res => res.json());
                return data;
            }, false);
            setSelected(text)
        }}>
            <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">{selected.name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        {/* <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                /> */}
                    </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {categories.map((category, personIdx) => (
                            <Listbox.Option
                                key={personIdx}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-gray-400 text-blue-900' : 'text-white'
                                    }`
                                }
                                value={category}
                            >
                                {({ selected }) => (
                                    <>
                                        <span
                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                }`}
                                        >
                                            {category.name}
                                        </span>
                                        {selected ? (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    )
}

export default BuyCategory