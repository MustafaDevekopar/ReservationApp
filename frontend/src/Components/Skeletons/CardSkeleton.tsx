import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CardSkeleton = () => (
  <div className="relative rounded-t-3xl overflow-hidden shadow-lg mb-4">
    <Skeleton height={200} className="aspect-[7/3] w-full object-cover p-1" />
    <div className="px-4 pt-2 pb-5">
      <div className="flex justify-between relative text-md text-DarkGray">
        <Skeleton width="60%" />
        <span className="absolute left-0 top-3">
          <Skeleton circle={true} height={24} width={24} className="ml-4 top-7 left-8 w-6 h-6" />
        </span>
      </div>
      <div className="flex">
        <div className="flex-auto text-xs">
          <div className="flex flex-col my-2 justify-around gap-2 ">
            <Skeleton width="60%" height={16} className="mx-2  w-full mb-3" />
            <Skeleton width="90%" height={14}  className="mx-2  w-full" />
            <Skeleton width="70%" height={14}  className="mx-2  w-full" />
            <Skeleton width="80%" height={14}  className="mx-2  w-full" />
          </div>
        </div>
        <div className="flex-col mt-2">
          <div className="float-end">
            <div className="mt-3 mb-1">
              <Skeleton circle={true} height={16} width={16} className="w-4 inline-flex" />
              <Skeleton width="80%" className="font-bold mx-1 text-xs text-LightBlak" />
            </div>
            <Skeleton width="100px" height="32px" className="bg-Darkgreen rounded-full text-white px-3 py-2" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CardSkeleton;
