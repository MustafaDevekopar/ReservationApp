import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { UserProfiletype } from '../../Reservations';
import { UpdateUserProfile, UserGetById } from '../../Api';
import ButtonComponent from '../FormElements/ButtonComponent';
import FullPageLoader from '../FullPageLoader/FullPageLoader';


interface ProfileFormProps {
  userId: string | undefined;
}

const UpdateProfileForm: React.FC<ProfileFormProps> = ({ userId}) => {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [biography, setBiography] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) return; 
        setLoading(true);
        const data = await UserGetById(parseInt(userId)); 
        setName(data.userGet.name);
        setUsername(data.userName);
        setBiography(data.userGet.biography);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }finally{
        setLoading(false);
      }
    };

    fetchData(); 
  }, [userId]); 

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  
  const handleBiographyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBiography(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const UserData: UserProfiletype = {
      userName: username,
      name: name,
      biography: biography,
    };
    try {
      setLoading(true);
      const response = await UpdateUserProfile(Number(userId), UserData);
      window.location.reload();
      toast.success(response);
    } catch (error) {
      toast.error(`Error: ${error}`);
    }finally{
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center mx-2">
      {loading && <FullPageLoader />}
      <div className="w-full border-b-2 border-gray-900">
        <label className="text-xs">الاسم</label>
        <input 
          type="text" 
          value={name} 
          onChange={handleNameChange} 
          className="border-none bg-transparent outline-none focus:border-none focus:outline-none w-full p-3"
        />
      </div>
      <div className="w-full border-b-2 border-gray-900">
        <label className='text-xs'>اسم المستخدم</label>
        <input 
          type="text" 
          value={username} 
          onChange={handleUsernameChange}
          className="border-none bg-transparent outline-none focus:border-none focus:outline-none w-full p-3"
        />
      </div>
      <div className="w-full border-b-2 border-gray-900">
        <label className='text-xs'>السيرة الذاتيه</label>
        <input 
          type="text" 
          value={biography} 
          onChange={handleBiographyChange}
          className="border-none bg-transparent outline-none focus:border-none focus:outline-none w-full p-3"
        />
      </div>
      <div className="w-full">
        <ButtonComponent
          text='تعديل'
          type='submit'
          onClick={()=> console.log()}
        />
      </div>
      <ToastContainer />
    </form>
  );
};

export default UpdateProfileForm;
