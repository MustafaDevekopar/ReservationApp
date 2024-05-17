import { useState } from 'react'
import BtnDateTime from './BtnDateTime';
import {ReservDateInfo, ReservTimeInfo} from "./../../Api"

type DateProps = {
    Text: string;
    isDateNotTime: boolean;
}

const DateTimeReserve:React.FC<DateProps> = (
    {
    Text, 
    isDateNotTime
}: DateProps): JSX.Element => {

    const [selectedDateTime, setSelectedDateTime] = useState<string>("");
    const handleIconClick = (DateOrTime: string) => {
        setSelectedDateTime(DateOrTime);
    };

    const mapDatOrTime = isDateNotTime ? ReservDateInfo : ReservTimeInfo;

  return (
    <div className="mt-2 w-full">
        <div className="s">
            <span className="text-sm text-DarkGray">{Text}</span>
        </div>
        <div className="flex ">
            <div className=" bg-white shadow rounded-2xl p-4 my-2 grid w-full
                 grid-cols-3 sm:grid-cols-3  md:grid-cols-6  lg:grid-cols-9">
                    {mapDatOrTime.map((date) => 

                    <BtnDateTime key={date.id} 
                        isReserved={date.isReserved}
                        DateOrTime={date.isSelected_DateOrTime} // الخميس 2
                        isSelected={selectedDateTime === date.isSelected_DateOrTime} // الخميس 2
                        onClick={handleIconClick} 
                    />
                    )}
            </div>
        </div>
    </div>
  )
}

export default DateTimeReserve