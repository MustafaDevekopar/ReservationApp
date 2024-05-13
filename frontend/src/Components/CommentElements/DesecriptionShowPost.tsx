import React, { useState } from 'react'

type Props = {}

const DesecriptionShowPost = (props: Props) => {
    const [showFullText, setShowFullText] = useState(false);

    const handleToggleText = () => {
      setShowFullText(!showFullText);
    };
  return (
    
    <div className="flex gap-2 mx-4 mb-5">
    <span className="text-LightGray text-xs font-bold">n1u_u</span>
    <div className=" flex text-xs">
      <span
          className={` ${
          showFullText ? "line-clamp-none" : "line-clamp-1"
          }`}
          onClick={handleToggleText}
      >
          سارع في الحجز في ملعب سباعي الرمادي سارع في الحجز في ملعب سباعي
          الرمادي
          سارع في الحجز في ملعب سباعي الرمادي سارع في الحجز في ملعب سباعي
          الرمادي
      </span>
      <span onClick={handleToggleText} className="ml-12 text-LightXlGray">{!showFullText && "المزيد"}</span>
    </div>
  </div>
  )
}

export default DesecriptionShowPost