
import { Link } from 'react-router-dom';
import {information} from "./../Api"

const PostsPage: React.FC = () : JSX.Element => {

  return (
    <div className="flex flex-wrap justify-center  mt-6 mb-20
                     mx-3 sm:mx-6  md:mx-12 lg:mx-60 xl:mx-60">
      {information.map((post) => (
        <div key={post.id} className="w-1/3 p-[1px] lg:p-1 lg:w-1/4 xl:w-1/4">
          <Link to={`/showpost`} className="rounded-md overflow-hidden relative">
            <img src={post.imageUrl} alt={post.title} className="w-full aspect-9/16 object-cover rounded-xl overflow-hidden" />
            <div className="absolute bottom-1 right-2 flex items-center">
              <div className='m-0 p-0 '>
                <img src={post.imageUrl} alt="img" className="w-8 min-w-8 h-8 rounded-full outline-1 outline outline-white" />
                <span className="text-[10px] text-white text-center">n1n_u</span>       
              </div>
              <span className="text-[8px] text-white text-center line-clamp-2 mx-1"> عروض ملعب الرمادي النموذجي سارعوا الحجز قبل انتهاء</span>       
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostsPage;
