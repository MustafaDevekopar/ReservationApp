// ShowPostComments.tsx

import { useState, useEffect } from "react";
import { useParams } from "react-router";
import AddCommentBox from "../Components/CommentElements/AddCommentBox";
import CommentList from "../Components/Lists/CommentList";
import { CommentsGet } from '../Api';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Comment } from '../Reservations'; // تأكد من المسار الصحيح لاستيراد النوع Comment
import { DefaultAvatar } from "../assets/Image";

const ShowPostComments: React.FC = (): JSX.Element => {
  const { postId } = useParams<{ postId?: string }>(); // Dynamically retrieve the id parameter from the URL
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!postId) return;
        const commentData: Comment[] = await CommentsGet(parseInt(postId));
        setComments(commentData);
      } catch (error) {
        console.error('Error fetching comment data:', error);
      }
    };

    fetchData();
  }, [postId]);

  const addCommentToState = (comment: Comment) => {
    setComments([...comments, comment]);
  };

  return (
    <div className="container mx-auto py-8 pb-20">
      <h1 className="mb-4 text-md text-DarkGray text-center font-semibold ">التعليقات</h1>
      <CommentList comments={comments} /> 
      <AddCommentBox 
          Avatar={DefaultAvatar} 
          userId={5}
          postId={String(postId)}
          onAddComment={addCommentToState}
      />
      <ToastContainer />
    </div>
  );
};

export default ShowPostComments;
