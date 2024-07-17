
import { Icon } from '@iconify-icon/react';
import { User } from '../../Reservations';

import UserInTeamBox from '../TeamElements/UserInTeamBox';

type UserListProps = {
  users: User[];
  teamLeader: User;
}

const UserInTeamList = ({ users, teamLeader }: UserListProps) => {
  return (
    <div className="mt-4"> 

      {users.map((user) => (
        <UserInTeamBox 
          userid={user.id}
          avatar={user.avatar}
          name={user.name}
          username={user.username}
          isRead={user.isRead}
          isAccepted={user.isAccepted}
          isTeamLeader={user.isTeamLeader}
        />
      ))}
    </div>
  );
}

export default UserInTeamList;

