
import { Link } from 'react-router-dom'

type infoProps = {
    text:string;
    bgColor: string;
    textColor: string;
    textSize: string;
    path: string;
}

const LinkToButton = ({
    text,
    bgColor,
    textColor,
    textSize,
    path
}: infoProps) => {
  return (
    <div className={`
        bg-${bgColor} 
        text-${textColor} 
        text-${textSize} 
        flex justify-center items-center rounded-xl  `}>
    <Link to={path} className=" w-full h-full text-center py-2 ">{text}</Link>
  </div>
  )
}

export default LinkToButton