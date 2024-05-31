// import * as signalR from "@microsoft/signalr";


// const connection = new signalR.HubConnectionBuilder()
//     .withUrl("https://localhost:7249/notificationHub") 
//     .withAutomaticReconnect()
//     .build();

// export const startConnection = async () => {
//     try {
//         await connection.start();
//         console.log("SignalR Connected.");
//     } catch (err) {
//         console.log("SignalR Connection Error: ", err);
//         setTimeout(startConnection, 5000);
//     }
// };

// export const onReceiveNotification = (callback: (message: string) => void) => {
//     connection.on("ReceiveNotification", callback);
// };
import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { toast } from 'react-toastify';

const Notification: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7249/notificationHub') // Update the URL to match your backend
      .build();

    connection.on('ReceiveNotification', (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    connection.start().catch(err => console.error('Connection failed: ', err));

    return () => {
      connection.stop();
    };
  }, []);

  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <li>
            {toast(message)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;

