
// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
// import { toast } from 'react-toastify';
// import { useAuth } from './useAuth';
// import useSound from 'use-sound';
// import {notificationSound} from './../Components/Sound/NotificationSoundCom'; 

// interface NotificationContextType {
//   notifications: string[];
// }

// const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// interface NotificationProviderProps {
//   children: ReactNode;
// }

// export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
//   const { isLoggedIn, user } = useAuth();
//   const [connection, setConnection] = useState<HubConnection | null>(null);
//   const [notifications, setNotifications] = useState<string[]>([]);

//   const [play] = useSound(notificationSound);

//   useEffect(() => {
//     const newConnection = new HubConnectionBuilder()
//       .withUrl("https://localhost:7249/notificationHub")
//       .configureLogging(LogLevel.Information)
//       .build();

//     setConnection(newConnection);
//   }, []);

//   useEffect(() => {
//     if (connection) {
//       connection.start()
//         .then(() => {
//           console.log('Connected!');

//           connection.on('ReceiveMessage', (message: string) => {
//             setNotifications(notifications => [...notifications, message]);
//             toast.info(message);
//               play();
//           });


//           connection.on('ReceiveNotification', (message: string) => {
//             setNotifications(notifications => [...notifications, message]);
//             toast.info(message);
//               play();
//           });


//           // Register the user
//           connection.invoke('RegisterUser', user?.phonenumber)
//             .then(() => console.log('User registered successfully'))
//             .catch(err => console.error('Error registering user: ', err));
//         })
//         .catch(e => console.log('Connection failed: ', e));
//     }
//   }, [connection, user, play]);

//   return (
//     <NotificationContext.Provider value={{ notifications }}>
//       {children}
//     </NotificationContext.Provider>
//   );
// };

// export const useNotifications = (): NotificationContextType => {
//   const context = useContext(NotificationContext);
//   if (context === undefined) {
//     throw new Error('useNotifications must be used within a NotificationProvider');
//   }
//   return context;
// };

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { toast } from 'react-toastify';
import { useAuth } from './useAuth';
import useSound from 'use-sound';
import { notificationSound } from './../Components/Sound/NotificationSoundCom'; 

interface NotificationContextType {
  notifications: string[];
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const { isLoggedIn, user } = useAuth();
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [notifications, setNotifications] = useState<string[]>([]);

  const [play] = useSound(notificationSound);
  
  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:7249/notificationHub")
      .configureLogging(LogLevel.Information)
      .build();

    setConnection(newConnection);
  }, []);
  useEffect(() => {
    if (connection) {
      connection.start()
        .then(() => {
          console.log('Connected!');

          connection.on('ReceiveMessage', (message: string) => {
            setNotifications(notifications => [...notifications, message]);
            toast.info(message);
            play();
          });

          connection.on('ReceiveNotification', (message: string) => {
            setNotifications(notifications => [...notifications, message]);
            toast.info(message);
            play();
          });

          // Register the user and add to group
          connection.invoke('RegisterUser', user?.phonenumber, "فريق الابطال")
            .then(() => console.log('User registered successfully'))
            .catch(err => console.error('Error registering user: ', err));
        })
        .catch(e => console.log('Connection failed: ', e));
    }
  }, [connection, user, play]);

  return (
    <NotificationContext.Provider value={{ notifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
