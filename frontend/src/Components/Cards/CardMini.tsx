
import { LocationIcon, LikeIcon, TimeIcon } from './../IconsComponent/IconComponent';

type InfoProps = {
  imgSrc: string;
  fieldName: string;
}

const CardMini = ({imgSrc, fieldName}: InfoProps) => {
  return (

  <div className="relative rounded-t-3xl lg:rounded-t-[55px] overflow-hidden shadow-lg">
    <img className="aspect-[9/6] w-full object-cover" src={imgSrc} alt="Sunset in the mountains"/>
    <div className="px-2 pt-1 pb-1 text-[9px]">
      <div className="flex justify-between relative  font-bold  text-DarkGray">
        <span className="">{fieldName}</span>
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