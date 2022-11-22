import Input from "@/components/input/Input";
import TextArea from "@/components/input/textarea";
import { classNames } from "@/utils/utils";
import { Dialog } from "@headlessui/react";
import {MouseEvent, useState} from "react";
import {FiTrash} from "react-icons/fi";
import {useRecoilState, useRecoilValue} from "recoil";
import {editOpen, hostState} from "@/store/host";
import {mutate} from "swr";

export default function EditHostModal() {
    const [open, setOpen] = useRecoilState(editOpen)
    const host1 = useRecoilValue(hostState)

    const [hostName, setHostName] = useState<string>(host1.name);
    const [cpuInfo, setCpuInfo] = useState<string>(host1.cpu);
    const [ramInfo, setRamInfo] = useState<string>(host1.ram);
    const [storageInfo, setStorageInfo] = useState<string>(host1.storage);
    const [idproxmox, setIdProxmox] = useState<string>(host1.vimid);
    const [login, setLogin] = useState<string>(host1.login);
    const [password, setPassword] = useState<string>(host1.password);
    const [ip, setIP] = useState<string>(host1.ip);
    const [desciption, setDescription] = useState<string>(host1.description);
    const [price, setPrice] = useState<string>(host1.price);
    const [error, setError] = useState<string>('');


    const onSubmit = async(e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (hostName && cpuInfo && ramInfo && storageInfo && idproxmox && login && password && ip && desciption) {
            setError('');
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
            const res = await fetch(`/api/host?id=`+host1.id, {
                method: 'PUT',
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
            if(res.status === 201){
                await mutate('/api/host');
                setOpen(false);
            }
        } else {
            setError('Не все поля заполнены');
        }
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
                                               defaultValue={hostName}
                                               onChange={(e) => setHostName(e.target.value)}
                                               type={"text"}
                                               id={"hostName"}
                                               placeholder={"Название хоста"}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <Input name={"Характеристики процессора"}
                                               defaultValue={cpuInfo}
                                               onChange={(e) => setCpuInfo(e.target.value)}
                                               type={"text"}
                                               id={"cpuInfo"}
                                               placeholder={"Intel Core i7-10700K 3.8GHz 8-Core"}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <Input name={"Количество оперативки"}
                                               defaultValue={ramInfo}
                                               onChange={(e) => setRamInfo(e.target.value)}
                                               type={"text"}
                                               id={"ramInfo"}
                                               placeholder={"DDR4 16GB 3200MHz"}
                                        />
                                    </div>
                                    <div>
                                        <Input name={"Количество места на диске"}
                                               defaultValue={storageInfo}
                                               onChange={(e) => setStorageInfo(e.target.value)}
                                               type={"text"}
                                               id={"storageInfo"}
                                               placeholder={"HDD 1TB 7200rpm"}
                                        />
                                    </div>
                                    <div>
                                        <Input name={"ID сервера в proxmox"}
                                               defaultValue={idproxmox}
                                               onChange={(e) => setIdProxmox(e.target.value)}
                                               type={"text"}
                                               id={"idproxmox"}
                                               placeholder={"110"}
                                        />
                                    </div>
                                    <div>
                                        <Input name={"Логин в ssh"}
                                               defaultValue={login}
                                               onChange={(e) => setLogin(e.target.value)}
                                               type={"text"}
                                               id={"login"}
                                               placeholder={"root"}
                                        />
                                    </div>
                                    <div>
                                        <Input name={"Пароль в ssh"}
                                               defaultValue={password}
                                               onChange={(e) => setPassword(e.target.value)}
                                               type={"password"}
                                               id={"password"}
                                               placeholder={"Password"}
                                        />
                                    </div>
                                    <div className="">
                                        <Input name={"Ip адрес"}
                                               defaultValue={ip}
                                               onChange={(e) => setIP(e.target.value)}
                                               type={"text"}
                                               id={"ip"}
                                               placeholder={"110"}
                                        />
                                    </div>
                                    <div className="">
                                        <Input name={"Цена в месяц"}
                                               defaultValue={price}
                                               onChange={(e) => setPrice(e.target.value)}
                                               type={"number"}
                                               id={"price"}
                                               placeholder={"390"}
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <TextArea
                                            name="Описание хоста"
                                            defaultValue={desciption}
                                            onChange={(e) => setDescription(e.target.value)}
                                            id="description"
                                            placeholder="Крутой хост для сервера по майнкрафту"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 mt-4">
                                    <button onClick={onSubmit}
                                            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                        Обновить
                                    </button>
                                    <button type="button"
                                            className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                                        <FiTrash className="mr-1 -ml-1 w-5 h-5"/>
                                        Удалить
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
