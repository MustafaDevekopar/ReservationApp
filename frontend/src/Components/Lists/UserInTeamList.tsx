
import { User } from '../../Reservations';

import UserInTeamBox from '../TeamElements/UserInTeamBox';

type UserListProps = {
  users: User[];
}

const UserInTeamList = ({ users }: UserListProps) => {
  return (
    <div className="mt-4"> 
      {users.map((user) => (
        <UserInTeamBox 
          userid={user.id}
          avatar={user.avatar}
          name={user.name}
          username={user.name}
        />
      ))}
    </div>
  );
}

export default UserInTeamList;

