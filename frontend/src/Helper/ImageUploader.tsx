import { Icon } from '@iconify-icon/react';
import React, { ReactNode, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploaderProps {
  onDrop: (acceptedFiles: File[]) => void;
  chooseImageElement: ReactNode;
  classNameStyle: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onDrop, chooseImageElement ,classNameStyle}) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.jpg'] },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={classNameStyle}
    >
      <input {...getInputProps()} />
      {chooseImageElement} 
    </div>
  );
};

export default ImageUploader;
