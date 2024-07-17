
import { useNavigate, useParams } from 'react-router-dom';
import { NotificationDataType } from '../../Reservations';
import NotificationBox from '../NotificationElements/NotificationBox';
import { UpdateIsReadNotification } from '../../Api';

type UserListProps = {
  notifications: NotificationDataType[];
}

const NotificationBoxList = ({ notifications }: UserListProps) => {
  const { userId } = useParams<{ userId?: string }>(); 
  const navigate = useNavigate();

  const handleNotificationClick = async (notificationId: number, isRead:boolean) => {
    try {
      if (!userId) return;
      if (isRead){
        navigate(`/showNotification/${notificationId}/userId/${userId}`);
      }else{
        const response = await UpdateIsReadNotification(parseInt(userId), notificationId);
        if (response) {
          navigate(`/showNotification/${notificationId}/userId/${userId}`);
        } else {
          console.error('Failed to mark notification as read.');
        }        
      }


    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="mt-4 w-full"> 
      {notifications.map((noti) => (
        <button key={noti.id} className='w-full'
          onClick={() => handleNotificationClick(noti.id, noti.isRead)}
        >
          <NotificationBox 
            notifid={noti.id}
            userid={noti.user.id}
            isRead={noti.isRead}
            avatar={noti.user.avatar}
            name={noti.user.name}
            username={noti.user.username}
            fieldname={noti.footballField.name}
            date={noti.reservation.dateTime}
            teamname={noti.team.name}
          />   
        </button>
      ))}
    </div>
  );
}

export default NotificationBoxList;
