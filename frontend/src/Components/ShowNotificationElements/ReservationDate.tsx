import { Icon } from '@iconify-icon/react'
import React from 'react'
import { formatDate, formatTime } from '../ReserveElement/Helpers'

type Props = {
    date: string;
}

const ReservationDate = ({date}: Props) => {
  return (
    <div className='p-2 flex flex-col gap-3'>
    <h2 className=''>موعد الحجز</h2>
    <div className="flex gap-4 w-full ">
      <div className="flex text-xs gap-1 items-center mb-1">
        <Icon icon="material-symbols:date-range"  className="text-Darkgreen text-2xl"/>
        <span className="">{formatDate(new Date(date))}</span>
      </div>
      <div className="flex text-xs gap-1 items-center mb-1">
        <Icon icon="icon-park-outline:time"  className="text-Darkgreen text-2xl"/>
        <span className="">{formatTime(new Date(date))}</span>
      </div>
    </div>
  </div>
  )
}

export default ReservationDate