
import LocationIcon from "./../../Assets/Icons/LocationIcon.svg";
import LikeIcon from "./../../Assets/Icons/LikeIcon.svg";
import PhoneIcon from "./../../Assets/Icons/PhoneIcon.svg";
import EyeIcon from "./../../Assets/Icons/EyeIcon.svg";
import TimeIcon from "./../../Assets/Icons/TimeIcon.svg";

type Props = {}

const Card = (props: Props) => {
  return (

  <div className="relative rounded-t-3xl overflow-hidden shadow-lg">
    <img className="aspect-[7/3] max-w-full obect-cover" src="https://th.bing.com/th/id/R.47a753a2aebdff63eb16a87b73084962?rik=AZy90cAwum4Atg&pid=ImgRaw&r=0" alt="Sunset in the mountains"/>
    <div className="px-4 pt-2 pb-5">
      <div className="flex justify-between relative text-md  text-DarkGray">
        <span className="mb-2 line-clamp-1">ملعب سباعي الرمادي</span>
        <span className="absolute left-0 top-3"><img className="ml-4 top-7 left-8 w-6 h-6" src={LikeIcon} alt="" /> </span>
      </div>
      <div className="flex text-xs ">
        <div className="flex-auto ">
          <div className="flex my-2">
            <img className="w-4" src={LocationIcon} alt="" /> 
            <span className="mx-2 line-clamp-1">الرمادي شارع 40</span> 
            <span className="font-bold text-LightBlak ">(1.5 كم)</span>
          </div>
          <div className="flex my-2">
            <img className="w-4" src={EyeIcon} alt="" /> 
            <span className="mx-2 text-LightXlGray line-clamp-1"> (209مشاهد  )</span> 
          </div>
          <div className="flex mt-2">
            <img className="w-4" src={PhoneIcon} alt="" /> 
            <span className="mx-2 ">07830574093  </span> 
            </div>
        </div>

        <div className="flex-col mt-2">
           <div className="float-end ">
              <div className="mt-3 mb-1 ">
              <img className="w-4 inline-flex " src={TimeIcon} alt="" /> 
              <span className="font-bold mx-1  text-LightBlak">(20 الف / ساعة)</span>
          </div>
          <button className="w-full bg-Darkgreen rounded-xl py-2 text-white">احجز الان</button>

           </div>
        </div>

      </div>
    </div>
    
  </div>
  )
}

export default Card