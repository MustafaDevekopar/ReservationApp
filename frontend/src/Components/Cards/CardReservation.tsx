
import { XIcon, PhoneBlackIcon } from './../../Components/IconsComponent/IconComponent';

interface ReservationsProps  {
  dateformat: string;
  dateTimeformat: string;
  fieldId: number;
  fieldName: string;
  fieldPhonNumber: string;

}

const CardReservation: React.FC<ReservationsProps> = (
  {dateformat,
    dateTimeformat,
    fieldId, fieldName, 
    fieldPhonNumber}) : JSX.Element=> {
  return (

    <div className="flex rounded-3xl h-[120px] w-full overflow-hidden ">
    {/* right   */}
   <div className="flex-[2] flex flex-col items-center justify-center bg-Darkgreen text-xs text-white">
     <span className="py-2">{dateformat}</span>
     <span className="py-2">{dateTimeformat}</span>
   </div>
    {/* left  */}
   <div className="flex-[3] flex flex-col text-xs p-2 bg-white">
     <div className="flex-1">
       <div className="flex justify-between">
         <span className="py-2">{fieldName}</span>
         <XIcon className="w-6 h-6 rounded-full p-1  shadow-md"/>
       </div>
       <div>
         <span className="py-2 text-DarkGray">رقم الحجز {fieldId}</span>
       </div>
     </div>

     <div className="flex-1 inline-flex  justify-between items-center">
      <PhoneBlackIcon className="w-8 h-8 rounded-full p-1 bg-white shadow-md" />
       <button className="px-3 py-2 rounded-full m bg-Darkgreen text-white">الغاء الحجز</button>
     </div>
   </div>
 </div>


  )
}

export default CardReservation