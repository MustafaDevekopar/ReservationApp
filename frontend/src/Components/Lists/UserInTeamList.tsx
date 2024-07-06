
import { User } from '../../Reservations';
import { DefaultAvatar } from '../../assets/Image';

type UserListProps = {
  users: User[];
}

const UserInTeamList = ({ users }: UserListProps) => {
  return (
    <div className="mt-4"> 
      {users.map((user) => (
        <div key={user.id} className="flex gap-2 items-center mb-2">
          <img
            className="w-10 h-10 rounded-full object-cover mr-2"
            src={
              user.avatar === null
                ? DefaultAvatar
                : `data:image/png;base64,${user.avatar}`
            }
            alt={user.name}
          />
          <div className="flex flex-col flex-1 gap-2 border-b-2 ">
             <span className="text-LightGray font-bold text-xs">{user.name}</span>
             <span className="text-LightGray text-[10px]">{user.username}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserInTeamList;

