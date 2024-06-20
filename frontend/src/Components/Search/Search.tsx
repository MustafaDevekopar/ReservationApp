import { Icon } from '@iconify-icon/react';
import React, { SyntheticEvent, useState } from 'react'

type Propss = {}

const Search: React.FC<Propss> = (props: Propss): JSX.Element => {
  const [search, setsearch] = useState<string>("");

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setsearch(e.target.value);
    console.log(e.target.value)
  };

  const onClick = (e: SyntheticEvent) => {
    
    console.log(e)

  };
  return (
    <div className=" flex bg-gray-200  rounded-md h-8 w-[60%] ">
      <button onClick={(e) => onClick(e)} className="flex items-center justify-center p-2"> 
         <Icon icon="humbleicons:search" className="text-xl"/>
          بحث
        </button>
      <input 
        type={search}
        onChange={(e) => handelChange(e)}
        className="flex-1 bg-transparent border-none focus:border-none outline-none focus:outline-none mr-2 w-40"
         />
    </div>
  )
}

export default Search