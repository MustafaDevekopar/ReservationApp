import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PostsGet } from '../../Api';
import { Post } from '../../Reservations';
import UsernameAvaratBox from '../CommentElements/UsernameAvaratBox';
import ImageOfShowPost from '../CommentElements/ImageOfShowPost';
import IconsOfShowPost from '../CommentElements/IconsOfShowPost';
import DesecriptionShowPost from '../CommentElements/DesecriptionShowPost';

const ShowPostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postData = await PostsGet();
        setPosts(postData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    // Find the selected post
    const selected = posts.find(post => String(post.id) === String(id));
    // If selected post exists, set it as selectedPost and filter it out from the posts array
    if (selected) {
      setSelectedPost(selected);
      setPosts(posts.filter(post => post.id !== selected.id));
    }
  }, [id, posts]);

  return (
    <div className="mb-20 mx-1 sm:mx-4 md:mx-12 lg:mx-60 xl:60">
      {/* Render selected post if exists */}
      {selectedPost && (
        <div key={selectedPost.id}>
          <UsernameAvaratBox avatarSrc={selectedPost.image} />
          <ImageOfShowPost imageSrc={selectedPost.image} />
          <IconsOfShowPost />
          <DesecriptionShowPost text={selectedPost.text} />
        </div>
      )}
      {/* Render remaining posts */}
      {posts.map((post) => (
        <div 
          key={post.id} 
          id={String(post.id)}
        >
          <UsernameAvaratBox avatarSrc={post.image} />
          <ImageOfShowPost imageSrc={post.image} />
          <IconsOfShowPost />
          <DesecriptionShowPost text={post.text} />
        </div>
      ))}
    </div>
  );
};

export default ShowPostList;
