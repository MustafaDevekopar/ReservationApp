// CommentList.tsx

import CommentBox from '../CommentElements/CommentBox';
import { Comment } from '../../Reservations'; // تأكد من المسار الصحيح لاستيراد النوع Comment

interface CommentListProps {
  comments: Comment[];
}

const CommentList = ({ comments }: CommentListProps) => {
  if (comments.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4 mx-3 sm:mx-4 md:mx-12 lg:mx-40">
      {comments.map((comment, index) => (
        <div key={index}>
          <CommentBox 
            commentTitle={comment.text} 
            commentUsername={comment.user.username} 
            commentName={comment.user.name}  
            commentAvatar={comment.user.avatar}
          />   
        </div>
      ))}
    </div>
  );
}

export default CommentList;
