
import React, { useEffect, useState } from 'react';
import { UserGetById } from '../Api';
import { useParams } from 'react-router';
import { UserDataType } from '../Reservations';
import UpdateAvatarCom from '../Components/ProfileUpdateElements/UpdatAvatarCom';
import UpdateProfileForm from '../Components/ProfileUpdateElements/UpdateProfileForm';
import { useAuth } from '../Context/useAuth';

const UpdateProfilePage: React.FC = () => {

  const {isLoggedIn, user} = useAuth();
  const { userId } = useParams<{ userId?: string }>();
  const [userData, setUserData] = useState<UserDataType | null>(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) return; 

        const data = await UserGetById(parseInt(userId)); 
        setUserData(data); 
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData(); 
  }, [userId]); 

  return (
    <div className='max-w-md min-w-2xl mx-auto mt-6'>
      {isLoggedIn() &&  user?.userName === userData?.userName 
      ?(<div>
          <h3 className="font-bold text-DarkGray mx-4 mb-4">تعديل الملف الشخصي</h3>
          <UpdateAvatarCom userData={userData} isUserAvatar={true}/>
          <UpdateProfileForm  userId={userId} />
        </div>)
      :( <div className='w-full h-screen flex justify-center items-center text-2xl text-DarkGray'>لا يمكن الوصول</div>)}
    </div>
  );
};

export default UpdateProfilePage;
