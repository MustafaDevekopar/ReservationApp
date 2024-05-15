import React from 'react'

type InfoProps = {
    text: string;
    textSize: string;
    color: string;
    paddingx:string;
    paddingy:string;
    marginx:string;
    hasIcon:boolean;
    icon: any;  //React.ReactNode or string value
}

const OutlineButton = ({
    text,
    textSize,
    color,
    paddingx,
    paddingy,
    marginx,
    hasIcon,
    icon
}: InfoProps) => {
  return (
    <button 
        className={`
        text-${textSize} 
        text-${color} 
        outline-${color} 
        px-${paddingx} 
        py-${paddingy} 
        mx-${marginx} 
        rounded-xl outline outline-2 `}>

        <div className='flex gap-2'>{text} {hasIcon && icon}</div> 
    </button>
  )
}

export default OutlineButton