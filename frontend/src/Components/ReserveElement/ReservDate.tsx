// ReservDate.tsx

import React, { useEffect, useState } from 'react';
import { Reservation, ReservationStatus } from '../../Reservations';
import { GetReservDate, GetReservationsOfField } from '../../Api';
import DateSelection from './DateSelection';
import TimeSelection from './TimeSelection';
import { addReserve } from '../../Api';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router';
import ConfirmOrBackBox from './ConfirmOrBackBox';

const ReservDate: React.FC = (): JSX.Element => {
  const { fieldId } = useParams<{ fieldId?: string }>();
  const [reservationStatus, setReservationStatus] = useState<ReservationStatus | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statusData = await GetReservDate();
        setReservationStatus(statusData);

        const reservationsData = await GetReservationsOfField(Number(fieldId));
        setReservations(reservationsData);
      } catch (error) {
        console.error('Error fetching reservation status or reservations:', error);
      }
    };

    fetchData();
  }, []);

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
        reservationStatus={reservationStatus}
        selectedDate={selectedDate}
        handleDateClick={handleDateClick}
        reservations={reservations}
      />
      
      <TimeSelection
        selectedDate={selectedDate}
        setSelectedTime={setSelectedTime}
        handleTimeClick={handleTimeClick}
        reservationStatus={reservationStatus}
        reservations={reservations}
        selectedTime={selectedTime}
      />
      {selectedDate && (<ConfirmOrBackBox onClick={handleAddReservation} /> )}
    </div>
  );
};

export default ReservDate;
