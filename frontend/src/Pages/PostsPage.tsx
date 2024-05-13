
import { Link } from 'react-router-dom';
import {information} from "./../Api"

const PostsPage: React.FC = () => {

  return (
    <div className="flex flex-wrap justify-center mx-2 sm:mx-4  md:mx-8 lg:mr-60 lg:ml-60 mt-6 mb-20">
      {information.map((post) => (
        <div key={post.id} className="w-1/3 p-[1px]">
          <Link to={`/showpost`} className="rounded-md overflow-hidden">
            <img src={post.imageUrl} alt={post.title} className="w-full aspect-9/16 object-cover rounded-xl overflow-hidden" />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostsPage;
