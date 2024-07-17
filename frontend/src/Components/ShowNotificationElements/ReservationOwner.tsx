import React from 'react'
import { DefaultAvatar } from '../../assets/Image';

type Props = {
    avatar: string | null;
    username: string;
    name: string;
}

const ReservationOwner = ({avatar, username, name}: Props) => {
  return (
    
    <div className='p-2 flex flex-col gap-3'>
    <h2 className=''>صاحب الحجز</h2>
    <div className="flex gap-3">
      <img src={avatar === null? DefaultAvatar : `data:image/png;base64,${avatar}` }alt="صورة" 
      className='w-12 h-12 rounded-full object-cover'/>
      <div className='flex flex-col justify-around text-xs '>
        <p>{username}</p>
        <p>{name}</p>            
      </div>
    </div>
  </div>
  )
}

export default ReservationOwner