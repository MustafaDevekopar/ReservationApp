import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CardMiniSkeleton = () => (
  <div className="relative rounded-t-3xl lg:rounded-t-[55px] overflow-hidden shadow-lg mb-4">
    <Skeleton height="60%" className="aspect-[9/6] w-full h-full object-cover p-1" />
    <div className="px-2 pt-1 pb-1 text-[9px]">
      <div className="flex justify-between relative font-bold text-DarkGray">
        <Skeleton width="60%" />
        <span className="absolute left-2 top-2">
          <Skeleton circle={true} height={20} width={20} className="w-5 h-5" />
        </span>
      </div>
      <div className="flex">
        <div className="flex-auto">
          {/* <div className="flex my-1">
            <Skeleton circle={true} height={12} width={12} className="w-3" />
            <Skeleton width="60%" className="mx-1" />
            <Skeleton width="70%" height={20} className="mx-1" />
          </div> */}
          <div className="flex flex-col gap-1 my-1">
            {/* <Skeleton circle={true} height={12} width={12} className="w-3" /> */}
            <Skeleton width="70%" className="mx-1" />
            <Skeleton width="70%" className="mx-1" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CardMiniSkeleton;
