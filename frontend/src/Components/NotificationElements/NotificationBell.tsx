import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getNotificationCountByUserId } from '../../Api';
import { Link } from 'react-router-dom';

const notificationIcon: string  = require( "./../../assets/Icons/notificationIcon.svg").default;

interface Props {
    userId: number;
}

const NotificationBell = ({userId}:Props) => {
//   const { userId } = useParams<{ userId?: string }>();
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        if (!userId) return;
        const notificationCount = await getNotificationCountByUserId(userId);
        setCount(notificationCount);
      } catch (error) {
        console.error('Error fetching notification count:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotificationCount();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Link to={`/notification/${userId}`} className="flex relative">
        <span className="absolute left-4 bottom-2 px-1 my-1 content-center rounded-full text-xs text-white bg-red-600 ">{count}</span>
        <img src={notificationIcon} alt="" />
    </Link>
    // <div>
    //   {count !== null ? <p>Number of notifications: {count}</p> : <p>No notifications found.</p>}
    // </div>
  );
};

export default NotificationBell;
