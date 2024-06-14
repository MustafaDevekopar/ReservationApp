import React, { useCallback, useState } from 'react';
import { UpdateUser } from '../Api';
import { useParams } from 'react-router';
import { DefaultAvatar } from '../assets/Image';
import UpdateAvatarForm from '../Components/ProfileUpdateElements/UpdateAvatarForm';
import { Crop, PixelCrop } from 'react-image-crop';

const UpdateProfilePage: React.FC = () => {
  // ======================================================
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
  // ======================================================
  const { userId } = useParams<{ userId?: string }>();
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [responseMessage, setResponseMessage] = useState<string>('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const patchData = [];
    if (name) patchData.push({ op: 'replace', path: '/name', value: name });
    if (username) patchData.push({ op: 'replace', path: '/username', value: username });

    try {
      const response = await UpdateUser(Number(userId), patchData);
      setResponseMessage(`Success: ${response}`);
    } catch (error) {
      setResponseMessage(`Error: ${error}`);
    }
  };

  return (
    <div className='w-full'>
      <h3 className="m-6 font-bold text-DarkGray">تعديل الملف الشخصي</h3>
      <div className="flex flex-col gap-4 w-full justify-center items-center m-2 static">
        <img src={DefaultAvatar} alt="صورة" className="w-20 h-20 rounded-full" />
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
                  croppedImageUrl={croppedImageUrl} // Pass croppedImageUrl here
                  setImage={setImage}  
          />
      </div>
      <form onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center mx-2"
      >
        <div className="w-full border-b-2 border-gray-900">
          <label className="text-xs">الاسم</label>
          <input type="text" value={name} onChange={handleNameChange} 
            className="border-none bg-transparent outline-none focus:border-none focus:outline-none w-full p-3"
          />
        </div>
        <div className="w-full border-b-2 border-gray-900">
          <label className='text-xs'>اسم المستخدم</label>
          <input type="text" value={username} onChange={handleUsernameChange}
                      className="border-none bg-transparent outline-none focus:border-none focus:outline-none w-full p-3"
           />
        </div>
        <div className="w-full border-b-2 border-gray-900">
          <label className='text-xs'>السيرة الذاتيه</label>
          <input type="text" 
                      className="border-none bg-transparent outline-none focus:border-none focus:outline-none w-full p-3"
           />
        </div>
        <button type="submit">Update User</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default UpdateProfilePage;
