
import { toast } from 'react-toastify';
import { DefaultAvatar } from '../../assets/Image';
import { XIcon, PhoneBlackIcon } from './../../Components/IconsComponent/IconComponent';
import { DeleteReservation } from '../../Api';
import React, { useState } from 'react';

interface ReservationsProps  {
  dateformat: string;
  dateTimeformat: string;
  fieldId: number;
  fieldName: string;
  username: string;
  fieldPhonNumber: string;
  avatar: string | null;

}

const CardReservation: React.FC<ReservationsProps> = (
  {
    dateformat,
    dateTimeformat,
    fieldId, 
    fieldName, 
    username,
    fieldPhonNumber,
    avatar,
  }) : JSX.Element=> {
    const [reservationId , setReservationId ] = useState<string>("")
    const handleDelete = (e: any) => {
        setReservationId(e.target.value);
        DeleteReservation(e.target.value)
          .then(response => {
            toast.success(response );
          })
          .catch(error => {
            console.error("Error Deleting :", error.message);
            toast.error('حدث خطأ . الرجاء المحاولة مرة أخرى.');
          })
    };
  return (

    <div className="flex rounded-3xl h-[120px] w-full overflow-hidden " key={fieldId}>
    {/* right   */}
   <div className="flex-[2] flex flex-col items-center justify-center bg-Darkgreen text-xs text-white">
     <span className="py-2">{dateformat}</span>
     <span className="py-2">{dateTimeformat}</span>
   </div>
    {/* left  */}
   <div className="flex-[3] flex flex-col text-xs p-2 bg-white">
     <div className="flex-1">
       <div className="flex justify-between">
        <div className='flex gap-2'>
          <div className="flex flex-col justify-center items-center">
              <img 
                  src={
                      avatar === null
                      ? DefaultAvatar
                      : `data:image/png;base64,${avatar}`
                  }
                  alt="صورة" className="object-cover min-w-10 w-10 h-10 rounded-full " 
              />  
          </div> 
          <div className="flex flex-col">          
            <span className="text-xs ">{fieldName}</span>
            <span className="text-xs font-buld">{username}</span>  
          </div>              
        </div>
         <XIcon className="w-6 h-6 rounded-full p-1  shadow-md"/>
       </div>
       <div className='float-end'>
         <span className="py-2 text-DarkGray">رقم الحجز {fieldId}</span>
       </div>
     </div>

     <div className="flex-1 inline-flex  justify-between items-center">
      <div className='flex items-center gap-2'>
         <PhoneBlackIcon className="w-8 h-8 rounded-full p-1 bg-white shadow-md" />
         <span>{fieldPhonNumber}</span>     
      </div>

      <button 
        className="px-3 py-2 rounded-full m bg-Darkgreen text-white"
        onClick={handleDelete}
        value={fieldId}
        >
        الغاء الحجز
      </button>
     </div>
   </div>
 </div>


  )
}

export default CardReservation