import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { NotificationDataType } from '../Reservations';
import { NotificationsGetById } from '../Api';
// import { NotificationsGetByUserId } from '../api';

type Props = {}

const ShowNotificationPage = (props: Props) => {
  const { notificationId } = useParams<{ notificationId?: string }>();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId');
  const [notification, setNotification] = useState<NotificationDataType | null>(null);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        // if (!notificationId || !userId) return;
        if (!notificationId) return;
        
        // Assuming there's a separate API to fetch single notification details
        const data = await NotificationsGetById(parseInt(notificationId));
        setNotification(data);
        //const selectedNotification = data.find(noti => noti.id === parseInt(notificationId));
        // setNotification(selectedNotification || null);
      } catch (error) {
        console.error('Error fetching notification:', error);
      }
    };

    fetchNotification();
  }, [notificationId]);

  if (!notification) return <div>Loading...</div>;

  return (
    <div className='bg-red-500 w-full px-12'>
      <h1>Notification Details</h1>
      <p>Notification ID: {notification.id}</p>
      <p>User ID: {userId}</p>
      <p>Text: {notification.text}</p>
      <p>Text: {notification.user.name}</p>
      <p>Text: {notification.footballField.latitude}</p>
      <p>Text: {notification.footballField.longitude}</p>
      <p>Text: {notification.footballField.name}</p>
      <p>Text: {notification.text}</p>
      <p>Is Read: {notification.isRead ? 'Yes' : 'No'}</p>
      {/* Add more details as needed */}
    </div>
  );
}

export default ShowNotificationPage;
