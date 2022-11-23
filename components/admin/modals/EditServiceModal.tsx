import Input from "@/components/input/Input";
import TextArea from "@/components/input/textarea";
import {classNames, errorToast, successToast} from "@/utils/utils";
import { Dialog } from "@headlessui/react";
import { MouseEvent, useState } from "react";
import {mutate} from "swr";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {editServiceOpen, serviceState} from "@/store/service";
import {FiTrash} from "react-icons/fi";
import {deleteStore} from "@/store/delete";

export default function EditServiceModal() {
    const [open, setOpen] = useRecoilState(editServiceOpen);
    const service:any = useRecoilValue(serviceState);
    const setDeleteState = useSetRecoilState(deleteStore);

    const [name, setName] = useState<string>(service.name);
    const [desciption, setDescription] = useState<string>(service.description);
    const [price, setPrice] = useState<string>(service.price);
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
            const res = await fetch(`/api/service?id=`+service.id, {
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
                successToast('Услуга успешно обнавлена');
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
                                               defaultValue={name}
                                               onChange={(e) => setName(e.target.value)}
                                               type={"text"}
                                               id={"name"}
                                               placeholder={"Название"}
                                        />
                                    </div>
                                    <div>
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
                                            name="Описание услуги"
                                            defaultValue={desciption}
                                            onChange={(e) => setDescription(e.target.value)}
                                            id="description"
                                            placeholder="Админы, которые будут работать с вашим сервером"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 mt-4">
                                    <button onClick={onSubmit}
                                            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                        Обновить
                                    </button>
                                    <button type="button"
                                            onClick={() => {
                                                setDeleteState({open: true, onDelete: async() => {
                                                        const res = await fetch(`/api/service?id=${service.id}`, {
                                                            method: 'DELETE',
                                                            headers: {
                                                                'Content-Type': 'application/json',
                                                            },
                                                        })
                                                        if (res.status === 201) {
                                                            successToast('Услуга успешно удалена');
                                                        }else{
                                                            errorToast('Что-то пошло не так');
                                                        }
                                                        setOpen(false)
                                                        await mutate(`/api/service`)
                                                    }
                                                })
                                            }}
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
