
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { LocationDataType, UserDataType } from '../../Reservations';
import { UpdateUserLocation, UserGetById, UserOrFieldGetByUsername } from '../../Api';
import ButtonComponent from '../FormElements/ButtonComponent';
import { Icon } from '@iconify-icon/react';
import { useAuth } from '../../Context/useAuth';
import MapComponent from './MapComponent';

interface ProfileFormProps {
  userId: string | undefined;
}

const LocationUpdateForm: React.FC<ProfileFormProps> = ({ userId }) => {
  const { isLoggedIn, user, logout } = useAuth();

  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserDataType>();
  const isField: boolean = user?.accountType == "FieldOwner";
  let username: string = "";
  if(user?.userName != null){
    username = user?.userName;
  }
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) return;

        // const data = await UserGetById(parseInt(userId));
        const data = await UserOrFieldGetByUsername(username,  isField);

        setLatitude(data.userGet.latitude);
        setLongitude(data.userGet.longitude);
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Error fetching user data');
      }
    };

    fetchData();
  }, [userId]);

  const handleLatitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLatitude(e.target.value);
  };

  const handleLongitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLongitude(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const UserData: LocationDataType = {
      latitude,
      longitude,
    };
    try {
      const response = await UpdateUserLocation(Number(userId), UserData, isField);
      toast.success(response);
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  };

  const handleSuccess = (position: GeolocationPosition) => {
    setLatitude(position.coords.latitude.toString());
    setLongitude(position.coords.longitude.toString());
    setError(null);
  };

  const handleError = (error: GeolocationPositionError) => {
    setError(error.message);
    setLatitude("");
    setLongitude("");
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };
//33.427077046582795   43.30538409231554
  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center mx-2">
      <div className='w-full mb-12'>
        {userData?.userGet.latitude != null && userData?.userGet.longitude != null
        ? <MapComponent lat={parseFloat(userData?.userGet.latitude)  } lng={parseFloat(userData.userGet.longitude)} />
        : ""
        }
      </div>

      <div className="w-full border-b-2 border-gray-900">
        <button 
          type="button" 
          onClick={getLocation} 
          className="w-full p-2 my-4 rounded-md border-dashed border-2 border-DarkGray flex justify-center items-center"
        >
          اضغط لجلب الموقع
          <Icon icon="typcn:location" className="text-Darkgreen text-2xl"/>
        </button>
        <label className='text-xs'>احداثي دوائر العرض (latitude)</label>
        <input 
          type="text" 
          value={latitude} 
          onChange={handleLatitudeChange}
          className="border-none bg-transparent outline-none focus:border-none focus:outline-none w-full p-3"
        />
      </div>
      <div className="w-full border-b-2 border-gray-900">
        <label className='text-xs'>احداثي خط الطول (longitude)</label>
        <input 
          type="text" 
          value={longitude} 
          onChange={handleLongitudeChange}
          className="border-none bg-transparent outline-none focus:border-none focus:outline-none w-full p-3"
        />
      </div>

      {error && <p className="text-red-500">Error: {error}</p>}
      <div className="w-full">
        <ButtonComponent
          text='تعديل'
          type='submit'
          onClick={() => console.log()}
        />
      </div>
      {/* <a 
        href={`https://gps-coordinates.org/my-location.php?lat=${latitude}&lng=${longitude}`} 
        target="_blank"
        rel="noopener noreferrer"
      >
        التاكد من موقعي
      </a> */}
      
      <ToastContainer />
    </form>
  );
};

export default LocationUpdateForm;
