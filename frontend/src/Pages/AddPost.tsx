import React, { useState, useCallback } from 'react';
import { Crop, PixelCrop } from 'react-image-crop';
import PostForm from '../Helper/PostForm';


const AddPost: React.FC = () => {
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
    <div className="max-w-md min-w-2xl mx-auto py-12 px-6">
      <h2 className="mb-8 text-center">اضافة منشور جديد</h2>
      <PostForm 
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
  );
};

export default AddPost;
