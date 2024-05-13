
import { Link } from 'react-router-dom';
import {information} from "./../Api"

const PostsPage: React.FC = () => {

  return (
    <div className="flex flex-wrap justify-center  mt-6 mb-20
                     mx-3 sm:mx-6  md:mx-12 lg:mr-24 lg:ml-8">
      {information.map((post) => (
        <div key={post.id} className="w-1/3 p-[1px] lg:p-1 lg:w-1/4 xl:w-1/4">
          <Link to={`/showpost`} className="rounded-md overflow-hidden">
            <img src={post.imageUrl} alt={post.title} className="w-full aspect-9/16 object-cover rounded-xl overflow-hidden" />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostsPage;
