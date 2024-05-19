import React from 'react'

type Props = {
  imageSrc: Text;
}

const ImageOfShowPost = ({imageSrc}: Props) => {
  return (
    <div>
    <img
        src={
          imageSrc === null
          ? "https://th.bing.com/th/id/OIP.znI0FjRzJgpcvCsAFpzq4QHaE7?w=268&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          : `data:image/png;base64,${imageSrc}`
        }
      alt=""
      className="w-full aspect-video"
    />
  </div>
  )
}

export default ImageOfShowPost