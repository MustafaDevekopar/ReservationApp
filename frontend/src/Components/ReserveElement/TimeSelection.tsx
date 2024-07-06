
import React from 'react';
import BtnDateTime from './BtnDateTime';
import { FieldDataType, Reservation } from '../../Reservations';
import { formatTime } from './Helpers';

type Props = {
  selectedDate: string;
  setSelectedTime: (time: string) => void;
  handleTimeClick: (time: string) => void;
  fieldData: FieldDataType | null;
  reservationsData: Reservation[];
  selectedTime: string;
};

const TimeSelection: React.FC<Props> = ({
  selectedDate,
  setSelectedTime,
  handleTimeClick,
  fieldData,
  reservationsData,
  selectedTime,
}: Props): JSX.Element => {
  let timesArray: Date[] = [];
  if (selectedDate) {
    if (fieldData?.userGet.openingHouer != null) {
      const openingHouers: string[] = JSON.parse(fieldData.userGet.openingHouer);

      // Sort openingHouers in ascending order
      const sortedOpeningHouers = openingHouers.sort((a, b) => {
        const timeA = new Date(`1970-01-01T${a}:00Z`);
        const timeB = new Date(`1970-01-01T${b}:00Z`);
        return timeA.getTime() - timeB.getTime();
      });

      const startDate = new Date(selectedDate);
      startDate.setHours(0, 0, 0, 0);

      sortedOpeningHouers.forEach((openHouer: string) => {
        const [hours, minutes] = openHouer.split(":").map(Number);
        const currentTime = new Date(startDate);
        currentTime.setHours(hours, minutes, 0, 0);
        timesArray.push(currentTime);
      });
    }
  }

  const now = new Date();

  // Filter timesArray to only include times that are >= now
  timesArray = timesArray.filter(time => time >= now);

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
                timesArray.map((time) => {
                  const isReserved = reservationsData.some(reservation =>
                    new Date(reservation.dateTime).getTime() === time.getTime()
                  );

                  const timeWithOffset = new Date(time.getTime() + (3 * 60 * 60 * 1000)).toISOString();
                  
                  return (
                    <BtnDateTime
                      key={time.toISOString()}
                      isReserved={isReserved}
                      visibleValue={formatTime(time)}
                      hiddenValue={timeWithOffset}
                      isSelected={selectedTime === timeWithOffset}
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
