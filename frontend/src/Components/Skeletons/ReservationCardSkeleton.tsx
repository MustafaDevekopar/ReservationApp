import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ReservationCardSkeleton = () => (
  <div className="flex rounded-3xl h-[120px] w-full overflow-hidden mb-4">
    {/* right */}
    <div className="flex-[2] flex flex-col gap-3 items-center justify-center bg-lightGreen">
      <Skeleton height={13} width={100} className="w-full" />
      <Skeleton height={13} width={70} className="w-full" />
    </div>
    {/* left */}
    <div className="flex-[3] flex flex-col text-xs p-2 bg-white">
      <div className="flex-1">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div className="flex flex-col justify-center items-center">
              <Skeleton circle={true} height={40} width={40} />
            </div>
            <div className="flex flex-col">
              <Skeleton height={10} width={100} className="my-1" />
              <Skeleton height={10} width={80} className="my-1" />
            </div>
          </div>
          <Skeleton circle={true} height={24} width={24} />
        </div>
        <div className="float-end">
          <Skeleton height={10} width={60} className="my-2" />
        </div>
      </div>
      <div className="flex-1 inline-flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Skeleton circle={true} height={32} width={32} />
          <Skeleton height={10} width={60} />
        </div>
        <div className="rounded-full overflow-hidden">
          <Skeleton height={32} width={50} className='w-full h-full p-2'/>
        </div>

      </div>
    </div>
  </div>
);

export default ReservationCardSkeleton;
