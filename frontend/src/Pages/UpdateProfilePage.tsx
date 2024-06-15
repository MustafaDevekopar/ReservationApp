
import React, { useCallback, useEffect, useState } from 'react';
import { UpdateUserProfile, UserGetById } from '../Api';
import { useParams } from 'react-router';
import { DefaultAvatar } from '../assets/Image';
import UpdateAvatarForm from '../Components/ProfileUpdateElements/UpdateAvatarForm';
import { Crop, PixelCrop } from 'react-image-crop';
import { UserDataType, UserProfiletype } from '../Reservations';
import { ToastContainer, toast } from 'react-toastify';
import ButtonComponent from '../Components/FormElements/ButtonComponent';

const UpdateProfilePage: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 90,
    height: 80,
    x: 0,
    y: 0,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const [croppingMode, setCroppingMode] = useState<boolean>(true);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setCroppingMode(true);
    setCroppedImageUrl(null);
  }, []);

  // ======================= fetch user data ======================
  const { userId } = useParams<{ userId?: string }>();
  const [userData, setUserData] = useState<UserDataType | null>(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) return; 

        const data = await UserGetById(parseInt(userId)); // Convert id to number
        setUserData(data); // Update state with the fetched data
        // Initialize form fields with fetched user data
        setName(data.userGet.name);
        setUsername(data.userName);
        setBiography(data.userGet.biography);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData(); 
  }, [userId]); 
  // ======================= fetch user data ======================

  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [biography, setBiography] = useState<string>('');
  //const [responseMessage, setResponseMessage] = useState<string>('');

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
    const data: UserProfiletype = {
      userName: username,
      name: name,
      biography: biography,
    }
    try {
      const response = await UpdateUserProfile(Number(userId), data);
      toast.success(response);
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  };

  return (
    <div className='max-w-md min-w-2xl mx-auto mt-6'>
      <h3 className="font-bold text-DarkGray mx-4 mb-4">تعديل الملف الشخصي</h3>
      <div className="flex flex-col gap-4 w-full justify-center items-center static ">
           <img  src={`${croppedImageUrl 
            ? (croppedImageUrl) 
            : ( 
                !userData?.userGet.avatar || userData?.userGet.avatar === null 
                  ? DefaultAvatar
                  : `data:image/png;base64,${userData?.userGet.avatar}`
              )  }`}  
            alt="Cropped" className="w-24 h-24 rounded-full object-cover"/> 
        <UpdateAvatarForm 
          image={image} 
          onDrop={onDrop}
          imageSrc={preview}
          crop={crop}
          setCrop={setCrop}
          completedCrop={completedCrop}
          setCompletedCrop={setCompletedCrop}
          croppingMode={croppingMode}
          setCroppedImageUrl={setCroppedImageUrl}
          croppedImageUrl={croppedImageUrl}
          setImage={setImage}  
        />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center mx-2">
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
        <ToastContainer/>
      </form>
    </div>
  );
};

export default UpdateProfilePage;
