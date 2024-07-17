import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { PostsGet } from '../../Api';
import { Post } from '../../Reservations';
import { DefaultAvatar ,DefaultGreenImage} from '../../assets/Image';
import FullPageLoader from '../FullPageLoader/FullPageLoader';

type Props = {}

const PostList = (props: Props) => {
    const [post, setPost] = useState<Post[]>([]); 
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          setLoading(true)
          const postData = await PostsGet(); 
          setPost(postData);
        } catch (error) {
          console.error('Error fetching users:', error);
        }finally{
          setLoading(false)
        }
      };
  
      fetchUsers();
    }, []);

    return (
        <div className="flex flex-wrap mt-6 mb-20
                         mx-3 sm:mx-6  md:mx-12 lg:mx-60 xl:mx-60">
          {loading && <FullPageLoader/>}
          {post.map((pst) => (
            <div key={pst.id} className="w-1/3 p-[1px] lg:p-1 lg:w-1/4 xl:w-1/4">
              <Link to={`/showpost/${String(pst.id)}`} className="rounded-md overflow-hidden relative">
              <div className="relative w-full aspect-9/16 rounded-xl overflow-hidden">
                <img 
                    src={ pst.image === null ? DefaultGreenImage : `data:image/png;base64,${pst.image}`} alt={"صوره"} 
                    className="w-full filter blur-sm absolute aspect-9/16 object-cover rounded-xl overflow-hidden" 
                  />
                <img 
                  src={ pst.image === null ? DefaultGreenImage : `data:image/png;base64,${pst.image}`} alt={"صوره"} 
                  className="w-full absolute aspect-9/16  object-contain overflow-hidden z-10" 
                />
              </div>

                <div className="absolute bottom-1 right-2 flex items-center z-30">
                  <div className='m-0 p-0 '>
                    <img 
                        src={ pst.image === null ? DefaultAvatar : `data:image/png;base64,${pst.field.avatar}` }
                        alt="img" className="object-cover m-0 w-8 min-w-8 h-8 rounded-full outline-1 outline outline-white" 
                      />
                    <div className="text-[8px] text-white text-center ">{pst.field.username}</div>       
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