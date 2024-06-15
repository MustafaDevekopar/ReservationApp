
import React, { useEffect, useState } from 'react';
import { UserGetById } from '../Api';
import { useParams } from 'react-router';
import { UserDataType } from '../Reservations';
import UpdateAvatarCom from '../Components/ProfileUpdateElements/UpdatAvatarCom';
import UpdateProfileForm from '../Components/ProfileUpdateElements/UpdateProfileForm';

const UpdateProfilePage: React.FC = () => {
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
      <h3 className="font-bold text-DarkGray mx-4 mb-4">تعديل الملف الشخصي</h3>
      <UpdateAvatarCom userData={userData} />
      <UpdateProfileForm 
        userId={userId}
      />
    </div>
  );
};

export default UpdateProfilePage;
