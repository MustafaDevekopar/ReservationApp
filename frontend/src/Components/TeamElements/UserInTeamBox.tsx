import React from 'react'
import { DefaultAvatar } from '../../assets/Image';
import { Icon } from '@iconify-icon/react';

type Props = {
    userid: number;
    avatar: string | null;
    name: string;
    username: string;
    isRead: boolean,
    isAccepted: boolean | null
    isTeamLeader: boolean;
}

const UserInTeamBox = ({userid, avatar, name, username, isRead, isAccepted,isTeamLeader}: Props) => {
  return (
  <div key={userid} className="flex gap-2 items-center mb-2">
    <img
      className="w-10 h-10 rounded-full object-cover mr-2"
      src={ avatar === null ? DefaultAvatar : `data:image/png;base64,${avatar}`} alt="صورة"
    />
    <div className='flex justify-between items-center border-b-2 pb-2 w-full'>
      <div className="flex flex-col justify-around">
        <span className="text-LightGray text-[10px]">{username}</span>
        <span className="text-LightGray font-bold text-xs">{name}</span>
      </div> 
      <div className='flex items-center justify-center'>
        {isRead && <Icon icon="bx:show" className='text-DarkGray text-2xl'/>}
      </div>     
      <div className='flex items-center justify-center'>
        {isAccepted === true ? (
          <Icon icon="dashicons:yes-alt"  className='text-Darkgreen text-2xl'/>
        ) : isAccepted === false ? (
          <Icon icon="mdi:cross-circle" className='text-red-600 text-2xl'/>
        ) : (
          <p className='mx-2'></p>
        )}  
        {isTeamLeader && <Icon icon="vaadin:medal" className='text-2xl text-yellow-400 '/>}        
      </div>      
    </div>

  </div>
  )
}

export default UserInTeamBox