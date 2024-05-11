
import LocationIcon from "./../../Assets/Icons/LocationIcon.svg";
import LikeIcon from "./../../Assets/Icons/LikeIcon.svg";
import TimeIcon from "./../../Assets/Icons/TimeIcon.svg";

type Props = {}

const CardMini = (props: Props) => {
  return (

  <div className="relative rounded-t-3xl overflow-hidden shadow-lg">
    <img className="aspect-w-4 aspect-h-3 max-w-full object-cover" src="https://th.bing.com/th/id/R.47a753a2aebdff63eb16a87b73084962?rik=AZy90cAwum4Atg&pid=ImgRaw&r=0" alt="Sunset in the mountains"/>
    <div className="px-2 pt-1 pb-1 text-[9px]">
      <div className="flex justify-between relative  font-bold  text-DarkGray">
        <span className="">ملعب سباعي الرمادي</span>
        <span className="absolute left-2 top-2">
            <img className="w-5 h-5" src={LikeIcon} alt="" /> 
        </span>
      </div>
      <div className="flex">
        <div className="flex-auto ">
          <div className="flex my-1">
            <img className="w-3" src={LocationIcon} alt="" /> 
            <span className="mx-1">(1.5 كم)</span> 
          </div>
          <div className="flex my-1">
            <img className="w-3" src={TimeIcon} alt="" /> 
            <span className="mx-1">(20 الف / ساعة)</span> 
          </div>
        </div>
      </div>
    </div>
    
  </div>
  )
}

export default CardMini