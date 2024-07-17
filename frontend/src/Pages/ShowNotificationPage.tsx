
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { NotificationDataType } from '../Reservations';
import { NotificationsGetById, UpdateIsAcceptedUser } from '../Api';
import FullPageLoader from '../Components/FullPageLoader/FullPageLoader';
import { toast } from 'react-toastify';
import ReservationDate from '../Components/ShowNotificationElements/ReservationDate';
import ReservationOwner from '../Components/ShowNotificationElements/ReservationOwner';
import ReservationField from '../Components/ShowNotificationElements/ReservationField';
import ReservationTeam from '../Components/ShowNotificationElements/ReservationTeam';
import ConfirmOrBackBox from '../Components/ReserveElement/ConfirmOrBackBox';
import ConfirmMsg from '../Components/ConfirmMsg';

type Props = {}

const ShowNotificationPage = (props: Props) => {
  const { notificationId } = useParams<{ notificationId?: string }>();
  const { userId } = useParams<{ userId?: string }>(); 
  const [loading, setLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<NotificationDataType | null>(null);
  const [isAccepted, setIsAccepted] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        setLoading(true);
        if (!notificationId) return;
        const data = await NotificationsGetById(parseInt(notificationId));
        setNotification(data);
        
        // Find the user's notification status
        const userNotification = data.userNotifications.find(user => user.id === parseInt(userId || ''));
        if (userNotification) {
          setIsAccepted(userNotification.isAccepted);
        }
      } catch (error) {
        console.error('Error fetching notification:', error);
      }finally{
        setLoading(false);
      }
    };

    fetchNotification();
  }, [notificationId, userId]);

  const handleIsAcceptedClick = async (accepted: boolean) => {
    try {
      setLoading(true);
      if (!userId || !notificationId) return;
      const response = await UpdateIsAcceptedUser(parseInt(userId), parseInt(notificationId), accepted);
      if (response) {
        setIsAccepted(accepted);
        accepted 
        ? toast.success("لقد وافقت على المشاركة في المباراة") 
        : toast.error("لقد رفضت المشاركة في المباراة");
      } else {
        console.error('Failed to update participation status.');
      }
    } catch (error) {
      console.error('Error:', error);
    }finally{
      setLoading(false);
    }
  };

  if (!notification) return <FullPageLoader />;

  return (
    <div className=''>
      {loading && <FullPageLoader />}
      <h1 className='text-center py-4'>مشاهدة الإشعار</h1>

      <div className='flex flex-col gap-2 mx-0 sm:mx-6 md:mx-12 lg:mr-40 lg:ml-20 max-w-full bg-white py-4 md:px-4 lg:px-4'>
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full">
          <div>
            <ReservationDate date={notification.reservation.dateTime} />
            <ReservationOwner 
              avatar={notification.user.avatar}
              name={notification.user.name}
              username={notification.user.username}
            />
            <ReservationField 
              avatar={notification.footballField.avatar}
              name={notification.footballField.name}
              username={notification.footballField.username}  
            />            
          </div>

          <ReservationTeam
            id={notification.team.id}
            name={notification.team.name}
            avatar={notification.team.avatar}
            teamLeader={notification.userNotifications[0]}// team lader i need to fix it 
            users={notification.userNotifications} 
          />
        </div>

        <div className='flex flex-col gap-3'>
          <h2 className='p-2'>هل توافق على المشاركة في المباراة؟</h2>
          <div className="flex gap-2 p-2">
          {
            isAccepted == null  && 
            (<div className='flex justify-around w-full rounded-full shadow-lg'>
              
              <ConfirmMsg
                id={0} 
                title="الموافقه على الحجز" 
                text="هل أنت متأكد أنك تريد توافق على المشاركه في المباراة" 
                btnText={<ConfirmOrBackBox onClick={()=>{} } bgColor='bg-blue-600' text='اوافق' icon='dashicons:yes'/>} 
                onDelete={() => handleIsAcceptedClick(true)} 
              />
              <ConfirmMsg
                id={0} 
                title="الموافقه على الحجز" 
                text="هل أنت متأكد أنك  لا تريد المشاركه في المباراة"
                btnText={<ConfirmOrBackBox onClick={()=>{}} bgColor='bg-red-500' text="لا اوافق" icon="dashicons:no-alt"/>} 
                onDelete={() => handleIsAcceptedClick(false)} 
              />
            </div>

              )
          }
          {isAccepted !== null  &&(
            <div className='flex justify-around items-center w-full rounded-full shadow-lg'>
            <h2 className='text-center text-DarkGray'>{isAccepted ?" لقد قبلت المشاركة":" لقد رفضت المشاركة "}</h2>  

              <ConfirmMsg
                id={0} 
                title="الموافقه على الحجز" 
                text={isAccepted ?  "هل أنت متأكد أنك  لا تريد المشاركه في المباراة" : "هل أنت متأكد أنك تريد توافق على المشاركه في المباراة" } 
                btnText={<ConfirmOrBackBox 
                  onClick={()=>{}} 
                  bgColor={isAccepted ?  "bg-red-500" : "bg-blue-600"} 
                  text={isAccepted ?  "لا اوافق" : "اوافق" } 
                  icon={isAccepted ?  "dashicons:no-alt" : "dashicons:yes"} 
                  />} 
                onDelete={() => handleIsAcceptedClick(!isAccepted)} 
              />               
            </div>
         
          )

          }


          </div>
        </div>

      </div>
    </div>
  );
}

export default ShowNotificationPage;
