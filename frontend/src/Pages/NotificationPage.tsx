import React, { useEffect, useState } from 'react'
import NotificationBoxList from '../Components/Lists/NotificationBoxList'
import { NotificationDataType, TeamDataType } from '../Reservations';
import { NotificationsGetByserId } from '../Api';
import FullPageLoader from '../Components/FullPageLoader/FullPageLoader';
import { useParams } from 'react-router';
import { useAuth } from '../Context/useAuth';

type Props = {}

const NotificationPage = (props: Props) => {
    const {isLoggedIn, user, logout} = useAuth();
    const { userId } = useParams<{ userId?: string }>(); 
    const [loading, setLoading] = useState<boolean>(false);
    const [team, setTeam] = useState<NotificationDataType[]>([]);

    const isFieldOwner: boolean = user?.accountType ==="FieldOwner";
 
    useEffect(() => {
      const fetchData = async () => {
        try {
          if (!userId ) return;
          setLoading(true);
          const data = await NotificationsGetByserId(parseInt(userId), isFieldOwner);
          setTeam(data);
        } catch (error) {
          console.error('Error fetching comment data:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [userId]);
  return (
    <div className="flex flex-col justify-center items-center w-full my-4">
        {loading && <FullPageLoader />}
        <h2>الاشعارات</h2>
      <div className="flex gap-2 mx-0 sm:mx-6  md:mx-12 lg:mr-40 lg:ml-20  max-w-full">
        <NotificationBoxList notifications={team}/>
     </div>
    </div>
  )
}

export default NotificationPage