import React from 'react';
import BtnDateTime from './BtnDateTime';
import { FieldDataType, Reservation, ReservationStatus } from '../../Reservations';
import { formatDate } from './Helpers';

type Props = {
  fieldData: FieldDataType | null;
  selectedDate: string;
  handleDateClick: (date: string) => void;
  reservationsData: Reservation[];
};

const DateSelection: React.FC<Props> = (
  { 
    fieldData, 
    selectedDate, 
    handleDateClick, 
    reservationsData 
  }: Props): JSX.Element => {

  let datesArray: Date[] = [];


    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set time to the start of the day
    let opingDayNumber = 0;
    if(fieldData?.userGet.openingDays != null){
       opingDayNumber = fieldData?.userGet.openingDays;
    }
    
    
    let closeDate = new Date();
    closeDate.setDate(currentDate.getDate() + opingDayNumber -1);
    while (currentDate <= closeDate) {
        datesArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }


  return (
    <div className="flex">
      <div className="bg-white shadow rounded-2xl p-4 my-2 grid w-full grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8">
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
