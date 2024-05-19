import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { PostsGet, information } from '../../Api';
import { Post } from '../../Reservations';

type Props = {}

const PostList = (props: Props) => {
    const [post, setPost] = useState<Post[]>([]); 

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const postData = await PostsGet(); 
          setPost(postData);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
  
      fetchUsers();
    }, []);

    return (
        <div className="flex flex-wrap justify-center  mt-6 mb-20
                         mx-3 sm:mx-6  md:mx-12 lg:mx-60 xl:mx-60">
          {post.map((pst) => (
            <div key={pst.id} className="w-1/3 p-[1px] lg:p-1 lg:w-1/4 xl:w-1/4">
              <Link to={`/showpost/${String(pst.id)}`} className="rounded-md overflow-hidden relative">
                <img 
                    src={
                        pst.image === null
                        ? "https://th.bing.com/th/id/OIP.znI0FjRzJgpcvCsAFpzq4QHaE7?w=268&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                        : `data:image/png;base64,${pst.image}`
                    }
                    alt={"صوره"} className="w-full aspect-9/16 object-cover rounded-xl overflow-hidden" />
                <div className="absolute bottom-1 right-2 flex items-center">
                  <div className='m-0 p-0 '>
                    <img 
                        src={
                            pst.image === null
                            ? "https://th.bing.com/th/id/OIP.znI0FjRzJgpcvCsAFpzq4QHaE7?w=268&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                            : `data:image/png;base64,${pst.image}`
                        }
                        alt="img" className="object-cover w-8 min-w-8 h-8 rounded-full outline-1 outline outline-white" />
                    <span className="text-[10px] text-white text-center">{pst.id}</span>       
                  </div>
                  <span className="text-[8px] text-white text-center line-clamp-2 mx-1">{pst.text}</span>       
                </div>
              </Link>
            </div>
          ))}
        </div>
      );
}

export default PostList