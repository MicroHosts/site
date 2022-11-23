import Input from "@/components/input/Input";
import TextArea from "@/components/input/textarea";
import {classNames, successToast} from "@/utils/utils";
import { Dialog } from "@headlessui/react";
import { MouseEvent, useState } from "react";
import {mutate} from "swr";

export default function CreateServiceModal({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) {

    const [name, setName] = useState<string>('');
    const [desciption, setDescription] = useState<string>('');
    const [price, setPrice] = useState<string>("0");
    const [error, setError] = useState<string>('');

    const onSubmit = async(e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (name && desciption) {
            setError('');
            const data = {
                name,
                desciption,
                price
            }
            const res = await fetch(`/api/service`, {
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
                successToast('Услуга успешно добавлена');
                setOpen(false);
                await mutate('/api/service');
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
                            <h2 className="mb-4 text-xl font-bold text-white">Добавить новую услугу</h2>
                            <div className={classNames(error ? "text-red-600" : "hidden")}>
                                {error}
                            </div>
                            <form>
                                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                    <div >
                                        <Input name={"Название"}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            type={"text"}
                                            id={"name"}
                                            placeholder={"Название"}
                                        />
                                    </div>
                                    <div>
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
                                            name="Описание услуги"
                                            value={desciption}
                                            onChange={(e) => setDescription(e.target.value)}
                                            id="description"
                                            placeholder="Админы, которые будут работать с вашим сервером"
                                        />
                                    </div>
                                </div>
                                <button onClick={onSubmit} className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 focus:ring-primary-900 hover:bg-primary-800">
                                    Добавить услугу
                                </button>
                            </form>
                        </div>
                    </Dialog.Panel>
                </div>
            </div>
        </Dialog>

    )
}
