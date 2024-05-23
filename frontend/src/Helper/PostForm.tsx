import React, { useState } from 'react';
import { useParams } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AddNewPost } from '../Api';
import InputComponent from '../Components/FormElements/InputComponent';
import TextareaComponent from '../Components/FormElements/TextareaComponent';
import ButtonComponent from '../Components/FormElements/ButtonComponent';
import ImageUploader from './ImageUploader';
import { Crop, PixelCrop } from 'react-image-crop';
import Cropper from './Cropper';

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

const PostForm: React.FC<PropsInfo> = ({ 
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
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (image) {
      try {
        await AddNewPost(Number(fieldId), { title, text, image });
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
    <form onSubmit={handleSubmit} >
      <InputComponent
        label='العنوان'
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)} 
      />
      <TextareaComponent
        label='الوصف'
        value={text}
        onChange={(e) => setText(e.target.value)} 
      />
      <ImageUploader onDrop={onDrop} />
       
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
        text='اضافة منشور'
        type='submit'
        onClick={() => console.log()} 
      />
      
        <ToastContainer />
    </form>
  );
};

export default PostForm;
