// CommentPage.js

import { useParams } from "react-router";
import AddCommentBox from "../Components/CommentElements/AddCommentBox";
import CommentList from "../Components/Lists/CommentList";

const ShowPostComments: React.FC = (): JSX.Element => {
  const { postId } = useParams<{ postId?: string }>(); // Dynamically retrieve the id parameter from the URL




  return (
    <div className="container mx-auto  py-8 pb-20">
      <h1 className="mb-4 text-md text-DarkGray text-center font-semibold ">التعليقات</h1>
      <CommentList />
      <AddCommentBox 
          Avatar={"https://i.pinimg.com/originals/c2/a5/19/c2a519566d628121523b1e75205586a5.jpg"} 
          userId = {1}
          postId = {String(postId)}
      />
    </div>
  );
};

export default ShowPostComments;
