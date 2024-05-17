
import ExplanatoryIcons from '../Components/ReserveElement/ExplanatoryIcons'
import DateTimeReserve from '../Components/ReserveElement/DateTimeReserve'
import ConfirmOrBackBox from '../Components/ReserveElement/ConfirmOrBackBox'
import { useState } from 'react'

type Props = {}

const ReservePage: React.FC<Props> = (props: Props): JSX.Element => {
  return (
    <div className="flex flex-col lg:gap-8 xl:gap-8 items-center my-8 mx-3 sm:mx-4  md:mx-12 lg:mx-40">
        <div className="flex justify-center items-center gap-6 mb-6">
            <ExplanatoryIcons 
              Color='bg-WhiteGreen'
              Text='متاح' />
            <ExplanatoryIcons 
              Color='bg-WhiteRed'
              Text='محجوز' />
            <ExplanatoryIcons 
              Color='bg-WhiteYellow'
              Text='مغلق' />
        </div>
        <div className="flex">
            <span className="mb-2 text-DarkGray">الحجوزات المتاحه  ل ملعب سباعي الرمادي</span>
        </div>
        <DateTimeReserve Text="تاريخ الحجز" isDateNotTime = {true} />
        <DateTimeReserve Text="وقت الحجز" isDateNotTime = {false} />
        <ConfirmOrBackBox />
    </div>
  )
}

export default ReservePage