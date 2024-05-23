// AddCommentBox.tsx

import { useState } from 'react';
import ArrowSend from "../../assets/Icons/ArrowSend.svg";
import { addComment } from '../../Api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Comment } from '../../Reservations'; // تأكد من المسار الصحيح لاستيراد النوع Comment

type CommenterAvatarProps = {
  Avatar: string;
}

interface AddCommentBoxProps extends CommenterAvatarProps {
  userId: number;
  postId: string;
  onAddComment: (comment: Comment) => void;
}

const AddCommentBox = ({ Avatar, userId, postId, onAddComment }: AddCommentBoxProps) => {
  const [commentText, setCommentText] = useState("");
  const [showSendButton, setShowSendButton] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(event.target.value);
    setShowSendButton(event.target.value.trim() !== "");
  };

  const handleAddComment = async () => {
    if(commentText){
      const newComment: Comment = {
        id: Date.now(), // Temporary ID
        text: commentText,
        dateTime: new Date(),
        user: {
          id: userId,
          username: "current_user", // Replace with actual username
          name: "Current User", // Replace with actual name
          avatar: Avatar // Use the provided Avatar
        }
      };

      // Optimistically add the comment to the UI
      onAddComment(newComment);

      try {
        await addComment(userId, postId, commentText);
        toast.success('تمت اضافة المنشور بنجاح');
      } catch (error) {
        toast.error("حدث خطأ اثناء اضافة التعليق");
        console.error("Error adding comment:", error);
      }

      setCommentText("");
      setShowSendButton(false);
    } else { 
      toast.error("يرجى اضافة تعليق اولا");
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
