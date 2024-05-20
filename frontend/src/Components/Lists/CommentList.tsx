import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { CommentsGet } from '../../Api';
import { Comment } from '../../Reservations';
import CommentBox from '../CommentElements/CommentBox';

type Props = {}

const CommentList = (props: Props) => {
    const { postId } = useParams<{ postId?: string }>(); // Dynamically retrieve the id parameter from the URL
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!postId) return;
                const commentData = await CommentsGet(parseInt(postId));
                setComments(commentData);
            } catch (error) {
                console.error('Error fetching comment data:', error);
            }
        };

        fetchData();
    }, [postId]);

    if (comments.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col gap-4 mx-3 sm:mx-4 md:mx-12 lg:mx-40">
        {comments.map((comment) => (
            <div>
            <CommentBox 
                commentTitle={comment.text} 
                commentUsername={comment.user.username} 
                commentName = {comment.user.name}  
                commentAvatar = {comment.user.avatar}
                />   
            </div>

        ))}
      </div>
    );
}

export default CommentList;
