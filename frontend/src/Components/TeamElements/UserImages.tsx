
import { User } from '../../Reservations';
import { DefaultAvatar } from '../../assets/Image';

type UsersProps = {
  users: User[];
}

const UserImages = ({ users }: UsersProps) => {
  const limitedUsers = users.slice(0, 6); // تحديد الحد الأقصى لعدد الصور إلى 4

  return (
    <div className="relative flex">
      {limitedUsers.map((user, index) => (
        <img
          key={index}
          className={`border-2 border-white w-10 h-10 rounded-full object-cover ${ '-mr-5' }`}
          src={
            user.avatar === null
              ? DefaultAvatar
              : `data:image/png;base64,${user.avatar}`
          }
          alt={`User ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default UserImages;
