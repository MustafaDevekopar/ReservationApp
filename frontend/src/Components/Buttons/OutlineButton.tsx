
type InfoProps = {
    text: string;
    textSize: string;
    textColor: string;
    outlinColor: string;
    paddingx:string;
    paddingy:string;
    marginx:string;
    hasIcon:boolean;
    icon: any;  //React.ReactNode or string value 'none'
}

const OutlineButton = ({
    text,
    textSize,
    textColor,
    outlinColor,
    paddingx,
    paddingy,
    marginx,
    hasIcon,
    icon
}: InfoProps) => {
  return (
    <button 
        className={`outline outline-2 text-xs
        text-${textSize} 
        ${textColor} 
        ${outlinColor} 
        px-${paddingx} 
        py-${paddingy} 
        mx-${marginx} 
        rounded-xl`}>

        <div className='flex gap-2'>{text} {hasIcon && icon}</div> 
    </button>
  )
}

export default OutlineButton