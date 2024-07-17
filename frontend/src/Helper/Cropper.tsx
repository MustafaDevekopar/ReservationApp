import React, { useEffect, useCallback, useRef } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { canvasPreview, getCanvasBlob } from '../Helper/Utils';

interface CropperProps {
  imageSrc: string;
  crop: Crop;
  setCrop: (crop: Crop) => void;
  completedCrop: PixelCrop | null;
  setCompletedCrop: (crop: PixelCrop) => void;
  croppingMode: boolean;
  setCroppedImageUrl: (url: string | null) => void;
  croppedImageUrl: string | null; // Add this line to include croppedImageUrl
  setImage: (file: File) => void;
}

const Cropper: React.FC<CropperProps> = ({
  imageSrc,
  crop,
  setCrop,
  completedCrop,
  setCompletedCrop,
  croppingMode,
  setCroppedImageUrl,
  croppedImageUrl, // Add this line to include croppedImageUrl
  setImage,
}) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const onLoad = useCallback((img: HTMLImageElement) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (completedCrop?.width && completedCrop?.height && imgRef.current && previewCanvasRef.current) {
      canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
    }
  }, [completedCrop]);

  useEffect(() => {
    const generateCroppedImage = async () => {
      if (completedCrop && previewCanvasRef.current) {
        const croppedBlob = await getCanvasBlob(previewCanvasRef.current);
        const croppedFile = new File([croppedBlob], 'cropped-image.jpg', { type: 'image/jpeg' });
        setCroppedImageUrl(URL.createObjectURL(croppedBlob));
        setImage(croppedFile);
      }
    };

    generateCroppedImage();
  }, [completedCrop]);

  return (
    <div className='mt-6'>
      {croppingMode ? (
        <ReactCrop
          crop={crop}
          onChange={(newCrop) => setCrop(newCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={4 / 3}
        >
          <img
            src={imageSrc}
            ref={imgRef}
            onLoad={(e) => onLoad(e.currentTarget)}
            alt="Crop me"
          />
        </ReactCrop>
      ) : (
        croppedImageUrl && (
          <img src={croppedImageUrl} alt="Cropped" className="max-w-full h-auto" />
        )
      )}
      {croppingMode && (
        <div>
          <canvas
            ref={previewCanvasRef}
            style={{ display: 'none' }}
          />
        </div>
      )}
    </div>
  );
};

export default Cropper;
