

import { Link } from "react-router-dom";

import { LocationIcon, LikeIcon, PhoneIcon, EyeIcon, TimeIcon } from './../IconsComponent/IconComponent';
import CardIconsTextsBox from "../CardElements/CardIconsTextsBox";

type InfoProps = {
  imgSrc: string;
  fieldName: string;
}

const Card = ({imgSrc, fieldName}: InfoProps) => {
  return (

  <div className="relative rounded-t-3xl overflow-hidden shadow-lg">
    <Link to={'/showfield/services'}>
      <img className="aspect-[7/3] w-full object-cover" src={imgSrc} alt="Sunset in the mountains"/>
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
            locationText="الرمادي حي المعلمين"
            distance="1.2"
            views="223"
            phoneNumber="07843876745"
         />

        {/* <div className="flex-auto "> 
          <div className="flex my-2">
            <LocationIcon className="w-4" />
            <span className="mx-2 line-clamp-1">الرمادي شارع 40</span> 
            <span className="font-bold text-LightBlak ">(1.5 كم)</span>
          </div>
          <div className="flex my-2">
            <EyeIcon className="w-4" />
            <span className="mx-2 text-LightXlGray line-clamp-1"> (209مشاهد  )</span> 
          </div>
          <div className="flex mt-2">
            <PhoneIcon className="w-4" /> 
            <span className="mx-2 ">07830574093  </span> 
            </div>
        </div> */}

        <div className="flex-col mt-2">
           <div className="float-end ">
              <div className="mt-3 mb-1 ">
              <TimeIcon className="w-4 inline-flex"/>
              <span className="font-bold mx-1 text-xs  text-LightBlak">(20 الف / ساعة)</span>
          </div>
          <div className="flex justify-center items-center bg-Darkgreen rounded-xl  text-white">
            <Link to="/reserve" className=" w-full h-full text-center py-2 text-sm ">احجز الان</Link>
          </div>

           </div>
        </div>

      </div>
    </div>
    
  </div>
  )
}

export default Card