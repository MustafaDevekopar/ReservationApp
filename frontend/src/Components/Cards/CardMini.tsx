
import { Link } from 'react-router-dom';
import { LocationIcon, LikeIcon, TimeIcon } from '../IconsComponent/IconComponent';

type InfoProps = {
  id: number;
  imgSrc: string;
  name: string;
}

const CardMini = ({imgSrc, name, id}: InfoProps) => {
  return (

  <div className="relative rounded-t-3xl lg:rounded-t-[55px] overflow-hidden shadow-lg">
      <Link to={`/showfield/${id}/services`}>
        <img 
            src={
              imgSrc === null
              ? "https://th.bing.com/th/id/OIP.znI0FjRzJgpcvCsAFpzq4QHaE7?w=268&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              : `data:image/png;base64,${imgSrc}`
            }
        className="aspect-[9/6] w-full object-cover"alt="صورة"/>
    </Link>
    <div className="px-2 pt-1 pb-1 text-[9px]">
      <div className="flex justify-between relative  font-bold  text-DarkGray">
        <span className="">{name}</span>
        <span className="absolute left-2 top-2">
            <LikeIcon  className='w-5 h-5'/>
        </span>
      </div>
      <div className="flex">
        <div className="flex-auto ">
          <div className="flex my-1">
            <LocationIcon className='w-3' />
            <span className="mx-1">(1.5 كم)</span> 
          </div>
          <div className="flex my-1">
            <TimeIcon className="w-3" />
            <span className="mx-1">(20 الف / ساعة)</span> 
          </div>
        </div>
      </div>
    </div>
    
  </div>
  )
}

export default CardMini