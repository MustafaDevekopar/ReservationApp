

import { Link } from "react-router-dom";

import { LikeIcon, TimeIcon } from './../IconsComponent/IconComponent';
import CardIconsTextsBox from "../CardElements/CardIconsTextsBox";
import LinkToButton from "../Buttons/LinkToButton";
import { calculateDistance } from "../../Helper/Helper";
import { DefaultAvatar, DefaultPost } from "../../assets/Image";

type InfoProps = {
  id: number;
  imgSrc: Text;
  fieldName: string;
  location: string;
  phoneNumber: string;
  latitude: number;
  longitude: number;
}

const Card = ({
  id,
  imgSrc,
  fieldName,
  location,
  phoneNumber,
  latitude,
  longitude,
}: InfoProps) => {
  return (

  <div className="relative rounded-t-3xl overflow-hidden shadow-lg">
    <Link to={`/showfield/${id}/services`}> 
      <img className="aspect-[7/3] w-full object-cover "
      src={
        imgSrc === null 
        ? DefaultPost
        : `data:image/png;base64,${imgSrc}`
      }
      alt="Sunset in the mountains"/>
    </Link>
    <div className="px-4 pt-2 pb-5">
      <div className="flex justify-between relative text-md  text-DarkGray">
        <span className="mb-2 line-clamp-1">{fieldName}</span>
        <span className="absolute left-0 top-3">
          <LikeIcon className="ml-4 top-7 left-8 w-6 h-6" />
          </span>
      </div>
      <div className="flex">
        <CardIconsTextsBox 
            locationText={location}
            distance={String(calculateDistance(33.476281, 43.417747 , latitude, longitude ) )} 
            views="223"
            phoneNumber={phoneNumber}
         />
        <div className="flex-col mt-2">
           <div className="float-end ">
              <div className="mt-3 mb-1 ">
              <TimeIcon className="w-4 inline-flex"/>
              <span className="font-bold mx-1 text-xs  text-LightBlak">(20 الف / ساعة)</span>
          </div>
          <LinkToButton
                text="احجز الأن"
                bgColor="Darkgreen"
                textColor="white"
                textSize="sm"
                width="auto"
                paddingx="0"
                paddingy="0"
                path={`/reserve/${id}`}
            />

           </div>
        </div>

      </div>
    </div>
    
  </div>
  )
}

export default Card