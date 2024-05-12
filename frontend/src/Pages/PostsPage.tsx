// PostPage.tsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PostsPage: React.FC = () => {
  // Mock posts data
  const [posts, setPosts] = useState<Array<any>>([]);

  useEffect(() => {
    // Fetch posts data from an API or use mock data
    // For demonstration, I'll use mock data
    const mockPosts = [
      { id: 1, imageUrl: 'https://th.bing.com/th/id/OIP.qChHVnS-8mJszMpvT8vlFwHaDj?w=1200&h=575&rs=1&pid=ImgDetMain', title: 'Post 1' },
      { id: 2, imageUrl: 'https://i.pinimg.com/originals/c2/a5/19/c2a519566d628121523b1e75205586a5.jpg', title: 'Post 2' },
      { id: 3, imageUrl: 'https://th.bing.com/th/id/OIP.s4TqNOMBzI0TJyyDfiVixAAAAA?w=215&h=381&c=7&o=5&dpr=1.3&pid=1.7', title: 'Post 3' },
      { id: 4, imageUrl: 'https://th.bing.com/th/id/OIP.HJneywe55Q1GeDYgcKPvcQHaJ3?w=215&h=286&c=7&o=5&dpr=1.3&pid=1.7', title: 'Post 3' },
      { id: 5, imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.7orlBPbAts33PDeZTUhlrQHaLJ?w=215&h=323&c=7&o=5&dpr=1.3&pid=1.7', title: 'Post 3' },
      { id: 6, imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.yFkW8daqPrFSfmIlAHPOWwHaFj?w=215&h=161&c=7&o=5&dpr=1.3&pid=1.7', title: 'Post 3' },
      { id: 7, imageUrl: 'https://i.pinimg.com/originals/c2/a5/19/c2a519566d628121523b1e75205586a5.jpg', title: 'Post 2' },
      { id: 8, imageUrl: 'https://th.bing.com/th/id/OIP.s4TqNOMBzI0TJyyDfiVixAAAAA?w=215&h=381&c=7&o=5&dpr=1.3&pid=1.7', title: 'Post 3' },
      { id: 9, imageUrl: 'https://th.bing.com/th/id/OIP.HJneywe55Q1GeDYgcKPvcQHaJ3?w=215&h=286&c=7&o=5&dpr=1.3&pid=1.7', title: 'Post 3' },
      { id: 10, imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.7orlBPbAts33PDeZTUhlrQHaLJ?w=215&h=323&c=7&o=5&dpr=1.3&pid=1.7', title: 'Post 3' },
      { id: 11, imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.yFkW8daqPrFSfmIlAHPOWwHaFj?w=215&h=161&c=7&o=5&dpr=1.3&pid=1.7', title: 'Post 3' },
      { id: 12, imageUrl: 'https://th.bing.com/th/id/OIP.qChHVnS-8mJszMpvT8vlFwHaDj?w=1200&h=575&rs=1&pid=ImgDetMain', title: 'Post 1' },

    ];
    setPosts(mockPosts);
  }, []);

  return (
    <div className="flex flex-wrap justify-center mx-2 sm:mx-4  md:mx-8 lg:mr-60 lg:ml-60 mt-6">
      {posts.map((post) => (
        <div key={post.id} className="w-1/3 p-[1px]">
          <Link to={`/showpost`}>
            <img src={post.imageUrl} alt={post.title} className="w-full aspect-9/16 object-cover" />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostsPage;
