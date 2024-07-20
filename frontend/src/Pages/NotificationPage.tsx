
import { useEffect, useState } from 'react';
import NotificationBoxList from '../Components/Lists/NotificationBoxList';
import { NotificationDataType } from '../Reservations';
import { useParams } from 'react-router';
import { useAuth } from '../Context/useAuth';
import { NotificationsGetByserId } from '../Api';
import InfiniteScroll from 'react-infinite-scroll-component';
import UserSkeleton from '../Components/Skeletons/UserSkeleton';


interface NotificationsResponse {
  notifications: NotificationDataType[];
  totalNotifications: number;
}

type Props = {}

const NotificationPage = (props: Props) => {
  const { isLoggedIn, user, logout } = useAuth();
  const { userId } = useParams<{ userId?: string }>(); 
  const [notifications, setNotifications] = useState<NotificationDataType[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const isFieldOwner: boolean = user?.accountType === "FieldOwner";

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) return;
        const data: NotificationsResponse = await NotificationsGetByserId(parseInt(userId), page, 11, isFieldOwner);

        if (Array.isArray(data.notifications)) {
          setNotifications(prevNotifications => {
            const updatedNotifications = [...prevNotifications, ...data.notifications];
            setHasMore(updatedNotifications.length < data.totalNotifications);
            return updatedNotifications;
          });
        } else {
          console.error("Unexpected data format:", data);
        }
        
      } catch (error) {
        console.error('Error fetching notification data:', error);
      }
    };

    fetchData();
  }, [userId, page]);

  const fetchMoreData = () => {
    setPage(prevPage => prevPage + 1);
  }


  return (
    <div className="justify-center items-center w-full my-4 ">
      <h2 className="text-center">الاشعارات</h2>
      <InfiniteScroll
        dataLength={notifications.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<UserSkeleton />}
        // endMessage={<p style={{ textAlign: 'center' }}><b>لا توجد اشعارات اضافية </b></p>}
      >
        <div className="flex gap-2 mx-0 sm:mx-6 md:mx-12 lg:mr-40 lg:ml-20 max-w-full">
          <NotificationBoxList notifications={notifications} />
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default NotificationPage;
