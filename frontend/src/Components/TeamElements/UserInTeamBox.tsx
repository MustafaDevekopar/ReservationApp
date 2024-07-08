import React from 'react'
import { DefaultAvatar } from '../../assets/Image';

type Props = {
    userid: number;
    avatar: string | null;
    name: string;
    username: string;
}

const UserInTeamBox = ({userid, avatar, name, username}: Props) => {
  return (
    <div key={userid} className="flex gap-2 items-center mb-2">
    <img
      className="w-10 h-10 rounded-full object-cover mr-2"
      src={
        avatar === null
          ? DefaultAvatar
          : `data:image/png;base64,${avatar}`
      }
      alt="صورة"
    />
    <div className="flex flex-col flex-1 gap-2 border-b-2 ">
       <span className="text-LightGray font-bold text-xs">{name}</span>
       <span className="text-LightGray text-[10px]">{username}</span>
    </div>
  </div>
  )
}

export default UserInTeamBox