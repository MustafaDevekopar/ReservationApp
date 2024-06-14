import React, { useState } from 'react';
import { useParams } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Crop, PixelCrop } from 'react-image-crop';
import { UpdateUserAvatar } from '../../Api';
import Cropper from '../../Helper/Cropper';
import ImageUploader from '../../Helper/ImageUploader';
import ButtonComponent from '../FormElements/ButtonComponent';
import { Icon } from '@iconify-icon/react';

interface PropsInfo  {
    image: File | null;
    onDrop: (acceptedFiles: File[]) => void;

    imageSrc: string | null;
    crop: Crop;
    setCrop: React.Dispatch<React.SetStateAction<Crop>>;
    completedCrop: PixelCrop | null
    setCompletedCrop: React.Dispatch<React.SetStateAction<PixelCrop | null>>;
    croppingMode: boolean;
    setCroppedImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
    croppedImageUrl: string | null;
    setImage: React.Dispatch<React.SetStateAction<File | null>>
}

const UpdateAvatarForm: React.FC<PropsInfo> = ({ 
    image,
    onDrop,
    imageSrc,
    crop,
    setCrop, 
    completedCrop, 
    setCompletedCrop,
    croppingMode,
    setCroppedImageUrl,
    croppedImageUrl,
    setImage
  }) => {

  const { fieldId } = useParams<{ fieldId?: string }>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (image) {
      try {
        await UpdateUserAvatar(Number(fieldId),  image );
        toast.success('تمت اضافة المنشور بنجاح');
      } catch (error: any) {
        console.error("Error adding post:", error.message);
        toast.error('حدث خطأ أثناء إضافة المنشور. الرجاء المحاولة مرة أخرى.');
      }
    } else {
      toast.error('يرجى تقديم صورة مقصوصة قبل تقديم المنشور.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" relative top-[-3rem]">
      <ImageUploader 
        onDrop={onDrop} 
        chooseImageElement={<Icon icon="mage:image-check" className="text-[2rem] text-DarkGray "/>}
        classNameStyle="cursor-pointer w-0"
      />
       
      {imageSrc && (
        <Cropper
          imageSrc={imageSrc}
          crop={crop}
          setCrop={setCrop}
          completedCrop={completedCrop}
          setCompletedCrop={setCompletedCrop}
          croppingMode={croppingMode}
          setCroppedImageUrl={setCroppedImageUrl}
          croppedImageUrl={croppedImageUrl} // Pass croppedImageUrl here
          setImage={setImage}
        />
      )}

      <ButtonComponent
        text='تعديل الصورة'
        type='submit'
        onClick={() => console.log()} 
      />
      
        <ToastContainer />
    </form>
  );
};

export default UpdateAvatarForm;
