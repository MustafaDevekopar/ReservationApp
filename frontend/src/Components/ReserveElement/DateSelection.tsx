import React from 'react';
import BtnDateTime from './BtnDateTime';
import { Reservation, ReservationStatus } from '../../Reservations';
import { formatDate } from './Helpers'; // Import formatDate helper function

type Props = {
  reservationStatus: ReservationStatus | null;
  selectedDate: string;
  handleDateClick: (date: string) => void;
  reservations: Reservation[];
};

const DateSelection: React.FC<Props> = ({ reservationStatus, selectedDate, handleDateClick, reservations }: Props): JSX.Element => {
  const openAt = reservationStatus?.openAt ? new Date(reservationStatus.openAt) : null;
  const closeAt = reservationStatus?.closeAt ? new Date(reservationStatus.closeAt) : null;

  let datesArray: Date[] = [];

  if (openAt && closeAt) {
    let currentDate = new Date(openAt);
    while (currentDate <= closeAt) {
      datesArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  return (
    <div className="flex">
      <div className="bg-white shadow rounded-2xl p-4 my-2 grid w-full grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
        {datesArray.length > 0 ? (
          datesArray.map((date, index) => (
            <BtnDateTime
              key={date.toISOString()}
              isReserved={false}
              visibleValue={formatDate(date)} 
              hiddenValue={date.toISOString()}
              isSelected={selectedDate === date.toISOString()}
              onClick={handleDateClick}
            />
          ))
        ) : (
          <span className="text-sm text-DarkGray col-span-3 md:col-span-6 lg:col-span-9">لا توجد حجوزات</span>
        )}
      </div>
    </div>
  );
};

export default DateSelection;
