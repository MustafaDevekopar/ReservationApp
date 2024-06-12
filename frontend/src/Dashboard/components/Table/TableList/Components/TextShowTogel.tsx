import React, { useState } from 'react'

type Props = {
  text: String;
}

const TextShowTogel = ({text}: Props) => {
    const [showFullText, setShowFullText] = useState(false);

    const handleToggleText = () => {
      setShowFullText(!showFullText);
    };
  return (
    
    <div className=" flex text-sm">
      <span
          className={` ${
          showFullText ? "line-clamp-none" : "line-clamp-1"
          }`}
          onClick={handleToggleText}
      >
        {text}
      </span>
      <span onClick={handleToggleText} className="ml-12 text-LightXlGray">{!showFullText && "المزيد"}</span>
    </div>
  )
}

export default TextShowTogel