import React from 'react'
import { DefaultGreenImage } from '../../assets/Image';

type Props = {
  imageSrc: Text;
}

const ImageOfShowPost = ({imageSrc}: Props) => {
  return (
    <div className=" w-full">
      <img
          src={ imageSrc === null ? DefaultGreenImage : `data:image/png;base64,${imageSrc}` } alt=""
          className="w-full h-auto "
      />
  </div>
  )
}

export default ImageOfShowPost