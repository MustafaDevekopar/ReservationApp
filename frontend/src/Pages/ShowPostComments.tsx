// CommentPage.js

import AddCommentBox from "../Components/CommentElements/AddCommentBox";
import CommentBox from "../Components/CommentElements/CommentBox";
const ShowPostComments = () => {
  // Fetch comments or get them through props
  const comments = [
    { id: 1, imageUrl: 'https://th.bing.com/th/id/OIP.qChHVnS-8mJszMpvT8vlFwHaDj?w=1200&h=575&rs=1&pid=ImgDetMain', user:'n1u-u', title: 'تعليق افتراضي ' },
    { id: 2, imageUrl: 'https://i.pinimg.com/originals/c2/a5/19/c2a519566d628121523b1e75205586a5.jpg', user:'n1u-u', title: 'تعليق' },
    { id: 3, imageUrl: 'https://th.bing.com/th/id/OIP.s4TqNOMBzI0TJyyDfiVixAAAAA?w=215&h=381&c=7&o=5&dpr=1.3&pid=1.7', user:'n1u-u', title: ' افتراضي لغرض تطوور  البرنامج لذلك اقتضى التنبيه  تعليق افتراضي لغرض تطوور تعليق افتراضي لغرض تطوور  البرنامج لذلك اقتضى التنبيه ' },
    { id: 4, imageUrl: 'https://th.bing.com/th/id/OIP.HJneywe55Q1GeDYgcKPvcQHaJ3?w=215&h=286&c=7&o=5&dpr=1.3&pid=1.7', user:'n1u-u', title: 'تعليق افتراضي لغرض تطوور  البرنامج لذلك اقتضى التنبيه ' },
    { id: 5, imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.7orlBPbAts33PDeZTUhlrQHaLJ?w=215&h=323&c=7&o=5&dpr=1.3&pid=1.7', user:'n1u-u', title: 'تعليق افتراضي لغرض تطوور  البرنامج لذلك اقتضى التنبيه ' },
    { id: 6, imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.yFkW8daqPrFSfmIlAHPOWwHaFj?w=215&h=161&c=7&o=5&dpr=1.3&pid=1.7', user:'n1u-u', title: 'تعليق افتراضي لغرض تطوور  البرنامج لذلك اقتضى التنبيه ' },
    { id: 2, imageUrl: 'https://i.pinimg.com/originals/c2/a5/19/c2a519566d628121523b1e75205586a5.jpg', user:'n1u-u', title: 'Post 2' },
    { id: 3, imageUrl: 'https://th.bing.com/th/id/OIP.s4TqNOMBzI0TJyyDfiVixAAAAA?w=215&h=381&c=7&o=5&dpr=1.3&pid=1.7', user:'n1u-u', title: 'تعليق افتراضي لغرض تطوور  البرنامج لذلك اقتضى التنبيه ' },
    { id: 4, imageUrl: 'https://th.bing.com/th/id/OIP.HJneywe55Q1GeDYgcKPvcQHaJ3?w=215&h=286&c=7&o=5&dpr=1.3&pid=1.7', user:'n1u-u', title: 'تعليق افتراضي لغرض تطوور  البرنامج لذلك اقتضى التنبيه ' },
    { id: 5, imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.7orlBPbAts33PDeZTUhlrQHaLJ?w=215&h=323&c=7&o=5&dpr=1.3&pid=1.7', user:'n1u-u', title: 'تعليق افتراضي لغرض تطوور  البرنامج لذلك اقتضى التنبيه ' },
    { id: 6, imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.yFkW8daqPrFSfmIlAHPOWwHaFj?w=215&h=161&c=7&o=5&dpr=1.3&pid=1.7', user:'n1u-u', title: 'تعليق افتراضي لغرض تطوور  البرنامج لذلك اقتضى التنبيه ' },
    { id: 1, imageUrl: 'https://th.bing.com/th/id/OIP.qChHVnS-8mJszMpvT8vlFwHaDj?w=1200&h=575&rs=1&pid=ImgDetMain', user:'n1u-u', title: 'تعليق افتراضي لغرض تطوور  البرنامج لذلك اقتضى التنبيه ' },

    // Add more posts as needed
  ];


  return (
    <div className="container mx-auto  py-8 pb-20">
      <h1 className="mb-4 text-md text-DarkGray text-center font-semibold ">التعليقات</h1>
      <div className="flex flex-col gap-4
                      mx-3 sm:mx-4  md:mx-12 lg:mx-40">
        {comments.map((comment, index) => (
           <CommentBox 
                key = {index}
                imageUrl = {comment.imageUrl}
                commentUsername = {comment.user}
                commentTitle = {comment.title}  
           />  
        ))}
      </div>
      <AddCommentBox Avatar={comments[2].imageUrl} />
    </div>
  );
};

export default ShowPostComments;
