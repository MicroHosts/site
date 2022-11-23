import { deleteStore } from "@/store/delete"
import { Dialog } from "@headlessui/react"
import {useRecoilState} from "recoil"
import {FaTrash} from "react-icons/fa";
import {GrClose} from "react-icons/gr";

export default function DeleteModal() {
    const  [state, setState] = useRecoilState(deleteStore);
    console.log(state)

    const closeModal = () => {
        setState({
            ...state,
            open: false
        })
    }

    return (
        <Dialog open={state.open} onClose={() =>closeModal()} as="div" className="relative z-[100]" >
            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Dialog.Panel>
                    <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                                <div className="relative p-4 text-centerrounded-lg shadow bg-gray-800 sm:p-5 rounded-lg">
                                    <button type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
                                        onClick={() => closeModal()}>
                                        <GrClose className="w-4 h-4"/>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                    <FaTrash className="text-gray-500 w-11 h-11 mb-3.5 mx-auto"/>
                                    <p className="mb-4 text-gray-300">Вы действительно хотите удалить?</p>
                                    <div className="flex justify-center items-center space-x-4">
                                        <button onClick={() => closeModal()} type="button" className="py-2 px-3 text-sm font-medium rounded-lg border focus:ring-4 focus:outline-none focus:ring-primary-300 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600">
                                            Отмена
                                        </button>
                                        <button type="submit" onClick={() =>
                                        {

                                            state.onDelete()
                                            closeModal()
                                        }}
                                        className="py-2 px-3 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none bg-red-500 hover:bg-red-600 focus:ring-red-900">
                                            Удалить
                                        </button>
                                    </div>
                                </div>
                            </div>
                    </Dialog.Panel>
                </div>
            </div>
        </Dialog>
    )
}
