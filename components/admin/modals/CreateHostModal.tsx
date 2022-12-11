import Input from "@/components/input/Input";
import TextArea from "@/components/input/textarea";
import {classNames, successToast} from "@/utils/utils";
import { Dialog } from "@headlessui/react";
import { MouseEvent, useState } from "react";
import { mutate } from "swr";

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
    const [vnc, setVNC] = useState<string>('');
    const [vncPassword, setVNCPassword] = useState<string>('');
    const [price, setPrice] = useState<string>("0");
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
                price,
                vnc,
                vncPassword
            }
            const res = await fetch(`/api/admin/host`, {
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
            if(res.status === 201){
                setOpen(false);
                successToast('Хост успешно создан');
                await mutate('/api/host');
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
                                    <div className="">
                                        <Input name={"VNC адрес"}
                                               value={vnc}
                                               onChange={(e) => setVNC(e.target.value)}
                                               type={"text"}
                                               id={"vnc"}
                                               placeholder={"ws://localhost:5900"}
                                        />
                                    </div>
                                    <div className="">
                                        <Input name={"Пароль VNC"}
                                               value={vncPassword}
                                               onChange={(e) => setVNCPassword(e.target.value)}
                                               type={"password"}
                                               id={"passwordvnc"}
                                               placeholder={"123123"}
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
                                <button onClick={onSubmit} className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 focus:ring-primary-900 hover:bg-primary-800">
                                    Добавить хост
                                </button>
                            </form>
                        </div>
                    </Dialog.Panel>
                </div>
            </div>
        </Dialog>

    )
}
