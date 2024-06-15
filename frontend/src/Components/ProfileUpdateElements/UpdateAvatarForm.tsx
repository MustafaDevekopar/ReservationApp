
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Crop, PixelCrop } from 'react-image-crop';

import { Icon } from '@iconify-icon/react';
import { UpdateUserAvatar } from '../../Api';
import ImageUploader from '../../Helper/ImageUploader';
import Cropper from '../../Helper/Cropper';
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

  const { userId } = useParams<{ userId?: string }>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (image) {
      setIsSubmitting(true); // Set submitting state to true
      UpdateUserAvatar(Number(userId), image)
        .then(response => {
          toast.success(`تم تحديث الصورة بنجاح: ${response || 'تم التحديث بنجاح'}`);
        })
        .catch(error => {
          console.error("Error updating avatar:", error.message);
          toast.error('حدث خطأ أثناء تحديث الصورة. الرجاء المحاولة مرة أخرى.');
        })
        .finally(() => {
          setIsSubmitting(false); // Reset submitting state
        });
    } else {
      toast.error('يرجى تقديم صورة مقصوصة قبل تحديث الصورة.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative top-[-3rem] flex flex-col items-center">
      <div className="flex w-28 justify-between">
        <ImageUploader
          onDrop={onDrop} 
          chooseImageElement={<Icon icon="fluent:image-add-20-regular"  className="text-2xl text-DarkGray  bg-white rounded-full p-1 border-2  "/>}
          classNameStyle="cursor-pointer w-0"
        />
        {croppedImageUrl && 
        <button type='submit' disabled={isSubmitting}>
          <Icon icon="flat-color-icons:ok" className='text-Darkgreen text-4xl' />
        </button>    }    
      </div>

      {isSubmitting && <p className="text-center">جارٍ تحديث الصورة...</p>} {/* Show loading message while submitting */}
      
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
    </form>
  );
};

export default UpdateAvatarForm;