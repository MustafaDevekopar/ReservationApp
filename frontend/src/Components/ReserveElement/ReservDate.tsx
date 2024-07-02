// ReservDate.tsx

import React, { useEffect, useState } from 'react';
import { FieldDataType, Reservation, ReservationStatus } from '../../Reservations';
import { FootbalfieldsGetById, GetReservDate, GetReservationsOfField } from '../../Api';
import DateSelection from './DateSelection';
import TimeSelection from './TimeSelection';
import { addReserve } from '../../Api';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router';
import ConfirmOrBackBox from './ConfirmOrBackBox';
import FullPageLoader from '../FullPageLoader/FullPageLoader';
import ConfirmMsg from '../ConfirmMsg';

interface Props {
  fieldData: FieldDataType | null;
  reservationsData: Reservation[];
}
const ReservDate: React.FC<Props> = ({fieldData,reservationsData}): JSX.Element => {
  const { fieldId } = useParams<{ fieldId?: string }>();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    setSelectedTime('');
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
  };

  const handleAddReservation = async () => {
    try {
      if (selectedDate && selectedTime) {
        setLoading(true);
        await addReserve(Number(fieldId), selectedTime);
        toast.success('تم الحجز بنجاح');
        
      } else {
        toast.error('!!يرجى اختيار كلا من التاريخ والوقت');
      }
    } catch (error) {
      console.error('Error adding reservation:', error);
    }finally{
      setLoading(false);
      new Promise(resolve => setTimeout(resolve, 2000));
      //window.location.replace("/reservations/current");
    }
  };

  return (
    <div className="mt-2 w-full">
      {loading && <FullPageLoader />}
      <div className="s">
        <span className="text-sm text-DarkGray">التاريخ</span>
        {/* <ToastContainer /> */}
      </div>
      <DateSelection
        fieldData={fieldData}
        selectedDate={selectedDate}
        handleDateClick={handleDateClick}
        reservationsData={reservationsData}
      />
      
      <TimeSelection
        selectedDate={selectedDate}
        setSelectedTime={setSelectedTime}
        handleTimeClick={handleTimeClick}
        fieldData={fieldData}
        reservationsData={reservationsData}
        selectedTime={selectedTime}
      />
      {selectedDate && (          
        <ConfirmMsg
            id={0} 
            title="تاكيد الحجز" 
            text="هل أنت متأكد أنك تريد الحجز" 
            btnText={<ConfirmOrBackBox onClick={()=>{}} />} 
            onDelete={handleAddReservation} />)}
      {/* {selectedDate && (<ConfirmOrBackBox onClick={handleAddReservation} /> )} */}
    </div>
  );
};

export default ReservDate;
