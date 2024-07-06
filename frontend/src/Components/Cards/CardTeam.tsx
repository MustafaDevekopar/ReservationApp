
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { User } from "../../Reservations";
import UserImages from "../TeamElements/UserImages"; 
import UserInTeamList from '../Lists/UserInTeamList';
import { Icon } from '@iconify-icon/react';

type InfoProps = {
  Id: number;
  Avatar: string | null;
  Name: string;
  users: User[];
}

const CardTeam = ({ Id, Avatar, Name, users }: InfoProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-lg">
      <button onClick={toggleExpanded} className='w-full'> 
        <img className="aspect-[7/3] w-full object-cover"
          src={Avatar === null 
            ? "https://th.bing.com/th/id/OIP.lwPpv1JqycBpzMUWW2sU0wHaEK?w=258&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            : `data:image/png;base64,${Avatar}`
          }
          alt="Sunset in the mountains"
        />
      </button>
      <div className="px-4 pt-2 pb-5">
        <div className="flex justify-between relative text-md text-DarkGray">
          <span className="mb-2 line-clamp-1">{Name}</span>
          <button onClick={toggleExpanded} className="focus:outline-none">
          {!expanded ? <UserImages users={users} /> : <Icon icon="ep:arrow-down-bold" className="pr-4"/> }
             
          </button>
        </div>
        {expanded && (
          <UserInTeamList users={users} />
        )}
      </div>
    </div>
  );
}

export default CardTeam;
