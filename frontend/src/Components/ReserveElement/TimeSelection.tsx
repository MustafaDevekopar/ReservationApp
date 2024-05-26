// TimeSelection.tsx

import React from 'react';
import BtnDateTime from './BtnDateTime';
import { Reservation, ReservationStatus } from '../../Reservations';
import { formatTime } from './Helpers';

type Props = {
  selectedDate: string;
  setSelectedTime: (time: string) => void;
  handleTimeClick: (time: string) => void;
  reservationStatus: ReservationStatus | null;
  reservations: Reservation[];
  selectedTime: string;
};

const TimeSelection: React.FC<Props> = ({
  selectedDate,
  setSelectedTime,
  handleTimeClick,
  reservationStatus,
  reservations,
  selectedTime,
}: Props): JSX.Element => {
  let timesArray: Date[] = [];

  if (reservationStatus && selectedDate) {
    const openAt = new Date(reservationStatus.openAt);
    const closeAt = new Date(reservationStatus.closeAt);

    const startDate = new Date(selectedDate);
    startDate.setHours(openAt.getHours(), openAt.getMinutes(), 0, 0);

    const endDate = new Date(selectedDate);
    endDate.setHours(closeAt.getHours(), closeAt.getMinutes(), 0, 0);

    let currentTime = new Date(startDate);

    while (currentTime <= endDate) {
      timesArray.push(new Date(currentTime));
      currentTime.setHours(currentTime.getHours() + 1);
    }
  }

  return (
    <>
      {selectedDate && (
        <>
          <div className="s">
            <span className="text-sm text-DarkGray">الوقت</span>
          </div>
          <div className="flex">
            <div className="bg-white shadow rounded-2xl p-4 my-2 grid w-full grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8">
              {timesArray.length > 0 ? (
                timesArray.map((time, index) => {
                  // Check if the current time slot is reserved
                  const isReserved = reservations.some(reservation =>
                    new Date(reservation.dateTime).getTime() === time.getTime()
                  );
                  
                  return (
                    <BtnDateTime
                      key={time.toISOString()}
                      isReserved={isReserved}
                      visibleValue={formatTime(time)}
                      hiddenValue={new Date(new Date(time).getTime() + (3 * 60 * 60 * 1000)).toISOString()}
                      isSelected={selectedTime === new Date(new Date(time).getTime() + (3 * 60 * 60 * 1000)).toISOString()}
                      onClick={handleTimeClick}
                    />
                  );
                })
              ) : (
                <span className="text-sm text-DarkGray col-span-3 md:col-span-6 lg:col-span-9">لا توجد أوقات متاحة</span>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TimeSelection;
