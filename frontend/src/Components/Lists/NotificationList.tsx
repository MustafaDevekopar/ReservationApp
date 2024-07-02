// src/components/NotificationList.tsx
import React from 'react';
import { useNotifications } from '../../Context/NotificationContext';

const NotificationList: React.FC = () => {
  const { notifications } = useNotifications();

  return (
    <div>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;
