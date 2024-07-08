
import { NotificationDataType} from '../../Reservations';
import NotificationBox from '../NotificationElements/NotificationBox';

type UserListProps = {
  notifications: NotificationDataType[];
}

const NotificationBoxList = ({ notifications }: UserListProps) => {
  return (
    <div className="mt-4 w-full"> 
      {notifications.map((noti) => (
        <NotificationBox 
          userid={noti.id}
          avatar={noti.user.avatar}
          name={noti.user.name}
          username={noti.user.username}

          fieldname={noti.footballField.name}
          date={noti.reservation.dateTime}
          teamname={noti.team.name}
        />
      ))}
    </div>
  );
}

export default NotificationBoxList;

