import React from 'react'
import { DefaultAvatar } from '../../assets/Image';
import { formatDate, formatTime } from '../ReserveElement/Helpers';
import { useAuth } from '../../Context/useAuth';

type Props = {
    userid: number;
    avatar: string | null;
    name: string;
    username: string;
    fieldname: string;
    date: string;
    teamname : string;
}

const NotificationBox = ({userid, avatar, name, username, fieldname, date, teamname}: Props) => {
    const {isLoggedIn, user, logout} = useAuth();
    const isFieldOwner: boolean = user?.accountType ==="FieldOwner"
  return (
    <div key={userid} className="flex gap-2 py-4 border-b-2 bg-white w-full px-2">
        <div className="flex flex-col justify-start items-start">
            <img className="w-12 h-12 rounded-full object-cover"
                src={avatar === null? DefaultAvatar : `data:image/png;base64,${avatar}` }alt="صورة"
            />
                {/* <span className="text-LightGray text-center text-[10px]">{username}</span> */}
        </div>

        <div className="flex flex-col flex-1 gap-2  ">
            <span className="text-LightGray font-bold text-xs">
                {
                    isFieldOwner ? (
                        <>
                            قام <strong>{username}</strong> بالحجز بموعد <strong>{formatDate(new Date(date))}</strong> في الساعة <strong>{formatTime(new Date(date))}</strong>
                        </>
                    ) : (
                        <>
                            دعاك <strong>{username}</strong> للمشاركة في مباراة في ملعب <strong>{fieldname}</strong> ضمن فريق <strong>{teamname}</strong> بموعد <strong>{formatDate(new Date(date))}</strong> في الساعة <strong>{formatTime(new Date(date))}</strong>
                        </>
                    )
                }
            </span>
        </div>
  </div>
  )
}

export default NotificationBox