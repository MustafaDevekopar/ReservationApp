import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const UserSkeleton = () => (
    // flex flex-col justify-center items-center w-full my-4
    <div className='gap-2 mx-0 sm:mx-6 md:mx-12 lg:mr-40 lg:ml-20 max-w-full'>
        <div className="flex gap-2 py-4 w-full border-b-2 px-2">
            <div className="flex flex-col justify-start items-start">
                <Skeleton circle={true} height={48} width={48} />
            </div>
            <div className="flex flex-col flex-1 gap-2">
                <Skeleton height={20} width="90%" />
                <Skeleton height={16} width="70%" />
            </div>
        </div>
        <div className="flex gap-2 py-4 w-full border-b-2 px-2">
            <div className="flex flex-col justify-start items-start">
                <Skeleton circle={true} height={48} width={48} />
            </div>
            <div className="flex flex-col flex-1 gap-2">
                <Skeleton height={20} width="90%" />
                <Skeleton height={16} width="70%" />
            </div>
        </div>
    </div>

);

export default UserSkeleton;
