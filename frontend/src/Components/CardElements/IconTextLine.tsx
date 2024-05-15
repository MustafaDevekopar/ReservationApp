import React from 'react'

type infoProps = {
    icon: React.ReactNode;
    text: string;
    distence: string;
}

const IconTextLine = ({icon, text, distence}: infoProps) => {
  return (
    <div className="flex my-2">
        <span className="w-4">{icon}</span>
        <span className="mx-2 line-clamp-1">{text}</span> 
         {distence !=="none" && <span className="font-bold text-LightBlak ">({distence} كم)</span>} 
    </div>
  )
}

export default IconTextLine