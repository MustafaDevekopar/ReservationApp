import { useState } from 'react';
import ArrowSend from "../../assets/Icons/ArrowSend.svg";
import { addComment } from '../../Api';

type CommenterAvatarProps = {
  Avatar: string;
}

interface AddCommentBoxProps extends CommenterAvatarProps {
  userId: number;
  postId: String ;
}

const AddCommentBox = ({ Avatar, userId, postId }: AddCommentBoxProps) => {
  const [commentText, setCommentText] = useState("");
  const [showSendButton, setShowSendButton] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(event.target.value);
    setShowSendButton(event.target.value.trim() !== "");
  };

  const handleAddComment = async () => {
    try {
      await addComment(userId,  postId, commentText);
      // alert("Comment added successfully");
      // Optionally, you can reset the comment text and hide the send button after adding the comment
      setCommentText("");
      setShowSendButton(false);
    } catch (error) {
      console.error("Error adding comment:", error);
      // Handle errors
    }
  };

  return (
    <div className="flex items-center fixed left-0 right-0 bottom-0 mt-4 px-5 bg-white p-4 gap-1 sm:mx-4 md:mx-12 lg:mx-40 border-t-2">
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
  );
}

export default AddCommentBox;
