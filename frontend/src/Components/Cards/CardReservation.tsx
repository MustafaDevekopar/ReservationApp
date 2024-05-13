// import xIcon from "./../../Assets/Icons/xIcon.svg"
// import phoneBlackIcon from "./../../Assets/Icons/phoneBlackIcon.svg"
import { XIcon, PhoneBlackIcon } from './../../Components/IconsComponent/IconComponent';

type Props = {}

const CardReservation = (props: Props) => {
  return (

    <div className="flex rounded-3xl h-[120px] w-full overflow-hidden ">
    {/* right   */}
   <div className="flex-[2] flex flex-col items-center justify-center bg-Darkgreen text-xs text-white">
     <span className="py-2">3/2 الخميس</span>
     <span className="py-2"> 8:00 م - 9:00م</span>
   </div>
    {/* left  */}
   <div className="flex-[3] flex flex-col text-xs p-2 bg-white">
     <div className="flex-1">
       <div className="flex justify-between">
         <span className="py-2">ملعب سباعي الرمادي</span>
         {/* <img className="w-6 h-6 rounded-full p-1  shadow-md" src={xIcon} alt="" /> */}
         <XIcon className="w-6 h-6 rounded-full p-1  shadow-md"/>
       </div>
       <div>
         <span className="py-2 text-DarkGray">رقم الحجز 241</span>
       </div>
     </div>

     <div className="flex-1 inline-flex  justify-between items-center">
       {/* <img className="w-8 h-8 rounded-full p-1 bg-white shadow-md" src={phoneBlackIcon} alt="" /> */}
      <PhoneBlackIcon className="w-8 h-8 rounded-full p-1 bg-white shadow-md" />
       <button className="px-3 py-2 rounded-full m bg-Darkgreen text-white">الغاء الحجز</button>
     </div>
   </div>
 </div>


  )
}

export default CardReservation