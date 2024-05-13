

import { Link } from "react-router-dom";

// const LocationIcon: string = require("../../assets/Icons/LocationIcon.svg").default;
// const LikeIcon: string = require("../../assets/Icons/LikeIcon.svg").default;
// const PhoneIcon: string = require("../../assets/Icons/PhoneIcon.svg").default;
// const EyeIcon: string = require("../../assets/Icons/EyeIcon.svg").default;
// const TimeIcon: string = require("../../assets/Icons/TimeIcon.svg").default;
import { LocationIcon, LikeIcon, PhoneIcon, EyeIcon, TimeIcon } from './../IconsComponent/IconComponent';

type Props = {}

const Card = (props: Props) => {
  return (

  <div className="relative rounded-t-3xl overflow-hidden shadow-lg">
    <img className="aspect-[7/3] max-w-full obect-cover" src="https://th.bing.com/th/id/R.47a753a2aebdff63eb16a87b73084962?rik=AZy90cAwum4Atg&pid=ImgRaw&r=0" alt="Sunset in the mountains"/>
    <div className="px-4 pt-2 pb-5">
      <div className="flex justify-between relative text-md  text-DarkGray">
        <span className="mb-2 line-clamp-1">ملعب سباعي الرمادي</span>
        <span className="absolute left-0 top-3">
          {/* <img className="ml-4 top-7 left-8 w-6 h-6" src={LikeIcon} alt="" />  */}
          <LikeIcon className="ml-4 top-7 left-8 w-6 h-6" />
          </span>
      </div>
      <div className="flex text-xs ">
        <div className="flex-auto ">
          <div className="flex my-2">
            {/* <img className="w-4" src={LocationIcon} alt="" />  */}
            <LocationIcon className="w-4" />
            <span className="mx-2 line-clamp-1">الرمادي شارع 40</span> 
            <span className="font-bold text-LightBlak ">(1.5 كم)</span>
          </div>
          <div className="flex my-2">
            {/* <img className="w-4" src={EyeIcon} alt="" />  */}
            <EyeIcon className="w-4" />
            <span className="mx-2 text-LightXlGray line-clamp-1"> (209مشاهد  )</span> 
          </div>
          <div className="flex mt-2">
            {/* <img className="w-4" src={PhoneIcon} alt="" />  */}
            <PhoneIcon className="w-4" /> 
            <span className="mx-2 ">07830574093  </span> 
            </div>
        </div>

        <div className="flex-col mt-2">
           <div className="float-end ">
              <div className="mt-3 mb-1 ">
              {/* <img className="w-4 inline-flex " src={TimeIcon} alt="" />  */}
              <TimeIcon className="w-4 inline-flex"/>
              <span className="font-bold mx-1  text-LightBlak">(20 الف / ساعة)</span>
          </div>
          <div className="flex justify-center items-center bg-Darkgreen rounded-xl  text-white">
            <Link to="/reserve" className=" w-full h-full text-center py-2 ">احجز الان</Link>
          </div>

          

           </div>
        </div>

      </div>
    </div>
    
  </div>
  )
}

export default Card