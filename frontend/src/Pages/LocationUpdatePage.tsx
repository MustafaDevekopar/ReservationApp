
import React, { useEffect, useState } from 'react';
import { UserGetById, UserOrFieldGetByUsername } from '../Api';
import { useParams } from 'react-router';
import { UserDataType } from '../Reservations';

import { useAuth } from '../Context/useAuth';
import LocationUpdateForm from '../Components/LocationElements/LocationUpdateForm';

const LocationUpdatePage: React.FC = () => {

  const {isLoggedIn, user} = useAuth();
  let username = "";
  let isFieldOwner: boolean = true;

  if(isLoggedIn() && user?.userName != null){
    isFieldOwner = user?.accountType == "FieldOwner";
     username = user.userName;
  }

  const { userId } = useParams<{ userId?: string }>();
  const [userData, setUserData] = useState<UserDataType | null>(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) return; 

        // const data = await UserGetById(parseInt(userId)); 
        const data = await UserOrFieldGetByUsername(username, isFieldOwner); 
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
      ?(<div >
          <h3 className="font-bold text-DarkGray mx-4 mb-4">تعديل الموقع الجغرافي</h3>
          <LocationUpdateForm  userId={userId} />
        </div>)
      :( <div className='w-full h-screen flex justify-center items-center text-2xl text-DarkGray'>لا يمكن الوصول</div>)}
    </div>
  );
};

export default LocationUpdatePage;
