import Input from "@/components/input/Input";
import TextArea from "@/components/input/textarea";
import { classNames } from "@/utils/utils";
import { Dialog } from "@headlessui/react";
import { MouseEvent, useState } from "react";

export default function CreateHostModal({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) {

    const [hostName, setHostName] = useState<string>('');
    const [cpuInfo, setCpuInfo] = useState<string>('');
    const [ramInfo, setRamInfo] = useState<string>('');
    const [storageInfo, setStorageInfo] = useState<string>('');
    const [idproxmox, setIdProxmox] = useState<string>('');
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [ip, setIP] = useState<string>('');
    const [desciption, setDescription] = useState<string>('');
    const [price, setPrice] = useState<string>("0");
    const [error, setError] = useState<string>('');

    const onSubmit = async(e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (hostName && cpuInfo && ramInfo && storageInfo && idproxmox && login && password && ip && desciption) {
            setError('');
            console.log('Все поля заполнены');
            const data = {
                hostName,
                cpuInfo,
                ramInfo,
                storageInfo,
                idproxmox,
                login,
                password,
                ip,
                desciption,
                price
            }
            const res = await fetch(`/api/host`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const json = await res.json();
            if(res.status !== 201){
                setError(json.message);
                return;
            }
        } else {
            console.log('Не все поля заполнены');
            setError('Не все поля заполнены');
        }
        console.log(hostName, cpuInfo, ramInfo, storageInfo, idproxmox, login, password, ip, desciption);
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)} as="div" className="relative z-10" >
            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Dialog.Panel>
                        <div className=" px-8 mx-auto max-w-2xl py-10 bg-gray-700 rounded-lg">
                            <h2 className="mb-4 text-xl font-bold text-white">Добавить новый хост</h2>
                            <div className={classNames(error ? "text-red-600" : "hidden")}>
                                {error}
                            </div>
                            <form>
                                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                    <div className="sm:col-span-2">
                                        <Input name={"Название хоста"}
                                               value={hostName}
                                               onChange={(e) => setHostName(e.target.value)}
                                               type={"text"}
                                               id={"hostName"}
                                               placeholder={"Название хоста"}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <Input name={"Характеристики процессора"}
                                               value={cpuInfo}
                                               onChange={(e) => setCpuInfo(e.target.value)}
                                               type={"text"}
                                               id={"cpuInfo"}
                                               placeholder={"Intel Core i7-10700K 3.8GHz 8-Core"}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <Input name={"Количество оперативки"}
                                               value={ramInfo}
                                               onChange={(e) => setRamInfo(e.target.value)}
                                               type={"text"}
                                               id={"ramInfo"}
                                               placeholder={"DDR4 16GB 3200MHz"}
                                        />
                                    </div>
                                    <div>
                                        <Input name={"Количество места на диске"}
                                               value={storageInfo}
                                               onChange={(e) => setStorageInfo(e.target.value)}
                                               type={"text"}
                                               id={"storageInfo"}
                                               placeholder={"HDD 1TB 7200rpm"}
                                        />
                                    </div>
                                    <div>
                                        <Input name={"ID сервера в proxmox"}
                                               value={idproxmox}
                                               onChange={(e) => setIdProxmox(e.target.value)}
                                               type={"text"}
                                               id={"idproxmox"}
                                               placeholder={"110"}
                                        />
                                    </div>
                                    <div>
                                        <Input name={"Логин в ssh"}
                                               value={login}
                                               onChange={(e) => setLogin(e.target.value)}
                                               type={"text"}
                                               id={"login"}
                                               placeholder={"root"}
                                        />
                                    </div>
                                    <div>
                                        <Input name={"Пароль в ssh"}
                                               value={password}
                                               onChange={(e) => setPassword(e.target.value)}
                                               type={"password"}
                                               id={"password"}
                                               placeholder={"Password"}
                                        />
                                    </div>
                                    <div className="">
                                        <Input name={"Ip адрес"}
                                               value={ip}
                                               onChange={(e) => setIP(e.target.value)}
                                               type={"text"}
                                               id={"ip"}
                                               placeholder={"110"}
                                        />
                                    </div>
                                    <div className="">
                                        <Input name={"Цена в месяц"}
                                               value={price}
                                               onChange={(e) => setPrice(e.target.value)}
                                               type={"number"}
                                               id={"price"}
                                               placeholder={"390"}
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <TextArea
                                            name="Описание хоста"
                                            value={desciption}
                                            onChange={(e) => setDescription(e.target.value)}
                                            id="description"
                                            placeholder="Крутой хост для сервера по майнкрафту"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <button type="submit"
                                            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                        Update product
                                    </button>
                                    <button type="button"
                                            className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                                        <svg className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                  clip-rule="evenodd"></path>
                                        </svg>
                                        Delete
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Dialog.Panel>
                </div>
            </div>
        </Dialog>

    )
}
