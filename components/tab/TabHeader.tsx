import {classNames} from "@/utils/utils";

export default function TabHeader({selected, name}: {selected:any, name:string}){
    return(
        <div
            className={classNames(
                selected
                    ? 'border-indigo-600 text-indigo-400'
                    : 'hover:bg-gray-800 hover:text-gray-300',
                'inline-block p-4 rounded-t-lg text-base')
            }
        >{name}</div>
    )
}
