
import React, { useEffect, useState } from 'react';
import { FootbalfieldsGetById, UserGetById } from '../Api';
import { useParams } from 'react-router';
import { FieldDataType } from '../Reservations';
import UpdateAvatarCom from '../Components/ProfileUpdateElements/UpdatAvatarCom';
import { useAuth } from '../Context/useAuth';
import UpdateProfileFieldForm from '../Components/ProfileUpdateElements/UpdateProfileFieldForm';

const UpdateFieldProfilePage: React.FC = () => {

  const {isLoggedIn, user} = useAuth();
  const { userId } = useParams<{ userId?: string }>();
  const [userData, setUserData] = useState<FieldDataType | null>(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) return; 

        const data = await FootbalfieldsGetById(parseInt(userId)); 
        setUserData(data); 
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData(); 
  }, [userId]); 

  return (
    <div className='max-w-md min-w-2xl mx-auto mt-6'>
      {isLoggedIn()  && user?.accountType === "FieldOwner" && user.userName === userData?.userName
      ?(<div>
          <h3 className="font-bold text-DarkGray mx-4 mb-4">تعديل الملف الشخصي</h3>
          <UpdateAvatarCom userData={userData} isUserAvatar={false}/>
          <UpdateProfileFieldForm  fieldId={userId}/>
        </div>)
      :( <div className='w-full h-screen flex justify-center items-center text-2xl text-DarkGray'>لا يمكن الوصول</div>)
      }
    </div>
  );
};

export default UpdateFieldProfilePage;
