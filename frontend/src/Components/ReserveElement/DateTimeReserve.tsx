import React, { useState } from 'react'
import BtnDateTime from './BtnDateTime';

type DateProps = {
    Text: string;
}

const DateTimeReserve = ({Text}: DateProps) => {

    const [selectedDateTime, setSelectedDateTime] = useState<string>("");
    const handleIconClick = (DateOrTime: string) => {
        setSelectedDateTime(DateOrTime);
    };

  return (
    <div className="flex flex-col mt-2">
        <div className="s">
            <span className="text-sm text-DarkGray">{Text}</span>
        </div>
        <div className="flex">
            <div className=" bg-white shadow rounded-2xl p-4 my-2 grid 
                 grid-cols-3 sm:grid-cols-3  md:grid-cols-5  lg:grid-cols-7">
                <BtnDateTime 
                    isReserved={false}
                    DateOrTime="2/2 الخميس"
                    isSelected={selectedDateTime === "2/2 الخميس"}
                    onClick={handleIconClick} 
                />
                <BtnDateTime 
                    isReserved={false}
                    DateOrTime="3/2 الجمعة"
                    isSelected={selectedDateTime === "3/2 الجمعة"}
                    onClick={handleIconClick} 
                />
                <BtnDateTime 
                    isReserved={true}
                    DateOrTime="4/2 السبت"
                    isSelected={selectedDateTime === "4/2 السبت"}
                    onClick={handleIconClick} 
                />
                <BtnDateTime 
                    isReserved={false}
                    DateOrTime="5/2 الاحد"
                    isSelected={selectedDateTime === "5/2 الاحد"}
                    onClick={handleIconClick} 
                />
                <BtnDateTime 
                    isReserved={false}
                    DateOrTime="6/2 الثلاثاء"
                    isSelected={selectedDateTime === "6/2 الثلاثاء"}
                    onClick={handleIconClick} 
                />
                <BtnDateTime 
                    isReserved={false}
                    DateOrTime="7/2 الاربعاء"
                    isSelected={selectedDateTime === "7/2 الاربعاء"}
                    onClick={handleIconClick} 
                />
            </div>
        </div>
    </div>
  )
}

export default DateTimeReserve