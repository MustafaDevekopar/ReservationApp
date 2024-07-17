import React from 'react'
import { User } from '../../Reservations';
import CardTeam from '../Cards/CardTeam';

type Props = {
    id: number;
    name: string;
    avatar: string| null;
    teamLeader: User;
    users: User[];
}

const ReservationTeam = ({id, name, avatar,teamLeader, users}: Props) => {
  return (
    <div className='p-2 flex flex-col gap-3'>
    <h2 className=''> الفريق </h2>
        <CardTeam
          Id={id}
          Name={name}
          Avatar={avatar}
          teamLeader={teamLeader}
          users={users}
        />           
  </div>
  )
}

export default ReservationTeam