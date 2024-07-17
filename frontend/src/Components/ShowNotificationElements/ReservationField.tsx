import React from 'react'
import { DefaultAvatar } from '../../assets/Image';

type Props = {
    avatar: string |null;
    username: string;
    name: string;
}

const ReservationField = ({avatar, name, username}: Props) => {
  return (
    <div className='p-2 flex flex-col gap-3'>
    <h2 className=''> الحجز في ملعب</h2>
    <div className="flex gap-3">
      <img src={avatar === null? DefaultAvatar : `data:image/png;base64,${avatar}` }alt="صورة" 
      className='w-16 min-w-14 rounded-2xl object-cover'/>
      
      <div className='flex flex-col justify-around text-xs'>
        <p>{username}</p>
        <p>{name}</p>               
      </div>

    </div>
    {/* <div className="w-full">
      <MapComponent 
        lat={latitude} 
        lng={longitude}
       />
    </div> */}
  </div>
  )
}

export default ReservationField