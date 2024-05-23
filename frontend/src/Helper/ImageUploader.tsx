import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploaderProps {
  onDrop: (acceptedFiles: File[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.jpg'] },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className="border-dashed border-2 border-LightXlGray hover:border-Darkgreen rounded-lg p-6 text-center cursor-pointer"
    >
      <input {...getInputProps()} />
      <p>اختر صورة</p>
    </div>
  );
};

export default ImageUploader;
