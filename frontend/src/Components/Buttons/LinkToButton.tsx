
import { Link } from 'react-router-dom'

type infoProps = {
    text:string;
    bgColor: string;
    textColor: string;
    textSize: string;
    width: string;
    paddingx:string;
    paddingy:string;
    path: string;
}

const LinkToButton = ({
    text,
    bgColor,
    textColor,
    textSize,
    width,
    paddingx,
    paddingy,
    path
}: infoProps) => {
  return (

    <Link to={path} className={` text-center py-2 flex justify-center items-center rounded-xl
        bg-${bgColor} 
        text-${textColor} 
        text-${textSize} 
        w-${width}
        px-${paddingx}
        py-${paddingy}

        `}>{text}</Link>

  )
}

export default LinkToButton