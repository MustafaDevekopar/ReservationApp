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
    <div className=" flex outline outline-2 outline-offset-2 outline-LightXlGray  rounded-md h-8 ">
      <input 
        type={search}
        onChange={(e) => handelChange(e)}
        className="flex-1 border-none focus:border-none outline-none focus:outline-none mr-2 w-40"
         />
         <button onClick={(e) => onClick(e)} className='w-8 bg-LightXlGray tesxt-xs text-white rounded-md hover:bg-Darkgreen hover:ease-in-out' > بحث</button>
    </div>
  )
}

export default Search