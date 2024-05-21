import { LocationIcon, LikeIcon, PhoneIcon, EyeIcon, TimeIcon } from './../IconsComponent/IconComponent';


type infoProps = {
    locationText: string;
    distance: string;
    views: string;
    phoneNumber:string
}

const CardIconsTextsBox = ({locationText, views, phoneNumber,distance}: infoProps) => {
  return (
    <div className='flex-auto text-xs'>

        <div className="flex my-2">
            <span className="w-4">{<LocationIcon />}</span>
            <span className="mx-2 line-clamp-1">{locationText}</span> 
            <span className="font-bold text-LightBlak ">({distance})</span>
        </div>
        <div className="flex my-2">
            <span className="w-4">{<EyeIcon className=''/>}</span>
            <span className="mx-2 line-clamp-1"> {views +" "}مشاهد </span> 
        </div>
        <div className="flex my-2">
            <span className="w-4">{<PhoneIcon className=''/>}</span>
            <span className="mx-2 line-clamp-1">{phoneNumber}</span> 
        </div>
    </div>
  )
}

export default CardIconsTextsBox