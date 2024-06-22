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

interface Props {
  fieldData: FieldDataType | null;
  reservationsData: Reservation[];
}
const ReservDate: React.FC<Props> = ({fieldData,reservationsData}): JSX.Element => {
  const { fieldId } = useParams<{ fieldId?: string }>();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

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
        await addReserve(Number(fieldId), selectedTime);
        toast.success('تم الحجز بنجاح');
      } else {
        toast.error('!!يرجى اختيار كلا من التاريخ والوقت');
      }
    } catch (error) {
      console.error('Error adding reservation:', error);
    }
  };

  return (
    <div className="mt-2 w-full">
      <div className="s">
        <span className="text-sm text-DarkGray">التاريخ</span>
        <ToastContainer />
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
      {selectedDate && (<ConfirmOrBackBox onClick={handleAddReservation} /> )}
    </div>
  );
};

export default ReservDate;
