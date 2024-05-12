import React, { useState } from 'react'
import ArrowSend from "./../../Assets/Icons/ArrowSend.svg"


type CommenterAvatarProps = {
    Avatar: string;
}

const AddCommentBox = ({Avatar}: CommenterAvatarProps) => {

    const [commentText, setCommentText] = useState("");
    const [showSendButton, setShowSendButton] = useState(false);
  
    const handleInputChange = (event: any) => {
      setCommentText(event.target.value);
      setShowSendButton(event.target.value.trim() !== "");// boolean valeu true or false
    };
  
    const handleAddComment = () => {
      // Add comment functionality
    };
  return (
    <div className="flex  items-center fixed left-0 right-0  bottom-0 mt-4 px-5 bg-white p-4 gap-1
    sm:mx-4 md:mx-12 lg:mx-40  border-t-2">
      <img src={Avatar} alt="" className="w-8 min-w-8 h-8 mb-2 rounded-full" />
      <input
    type="text"
    placeholder="اضافة تعليق ..."
    value={commentText}
    onChange={handleInputChange}
    className="py-2 w-full text-sm bg-transparent focus:outline-none focus:border-none"
  />
  {showSendButton && (
    <button
      onClick={handleAddComment}
      className="mt-2 bg-Darkgreen text-white font-semibold py-2 px-3 rounded-full focus:outline-none"
    >
      <img src={ArrowSend} alt="" />
    </button>
  )}
</div>
  )
}

export default AddCommentBox