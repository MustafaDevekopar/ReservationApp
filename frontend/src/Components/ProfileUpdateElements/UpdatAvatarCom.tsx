import React, { useCallback, useState } from 'react';
import { UserDataType } from '../../Reservations';
import { Crop, PixelCrop } from 'react-image-crop';
import { DefaultAvatar, DefaultPost } from '../../assets/Image';
import UpdateAvatarForm from './UpdateAvatarForm';


interface AvatarFormProps {
  userData: UserDataType | null;
  isUserAvatar: boolean;
}

const UpdateAvatarCom: React.FC<AvatarFormProps> = ({ userData, isUserAvatar }) => {
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

  return (
    <div className="flex flex-col gap-4 w-full justify-center items-center static ">
      <img 
        src={`${croppedImageUrl 
          ? (croppedImageUrl) 
          : ( 
              !userData?.userGet.avatar || userData?.userGet.avatar === null 
                ? DefaultPost
                : `data:image/png;base64,${userData?.userGet.avatar}`
            )}`}  
        alt="Cropped" className={`${isUserAvatar ? "w-24 rounded-full" : "aspect-[16/9] rounded-t-2xl"} object-cover h-24 `} 
      /> 
      <UpdateAvatarForm
        isUserAvatar={isUserAvatar}
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
  );
};

export default UpdateAvatarCom;
