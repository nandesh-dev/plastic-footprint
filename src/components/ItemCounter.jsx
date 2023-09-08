import { MdAdd as AddIcon, MdRemove as RemoveIcon} from 'react-icons/md'

export function ItemCounter({image, name, count, updateCount}){
    return <div className="rounded outline outline-2 outline-slate-200 p-1 grid grid-cols-[6fr_1fr_3fr_3fr_3fr] items-center">
        <img className="h-20 rounded-sm object-cover w-full" src={image} alt={name}/>
        <br />
        <button className='h-full flex items-center justify-center'
            onClick={()=>{updateCount("add")}}
            >
            <AddIcon size={26}/>
        </button>
        <span className='text-lg text-center'>{count}</span>
        <button className='h-full flex items-center justify-center'
            onClick={()=>{updateCount("reduce")}}
            >
            <RemoveIcon size={26}/>
        </button>
    </div>
}