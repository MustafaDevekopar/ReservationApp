import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ReservationDateSkeleton = () => (
  <div className='px-2 py-3 flex flex-col gap-3'>
    <Skeleton height={15} width={100} />
    <div className="flex gap-4 w-full">
      <div className="flex text-xs gap-1 items-center mb-1">
        <Skeleton height={24} width={24} />
        <Skeleton width={100} />
      </div>
      <div className="flex text-xs gap-1 items-center mb-1">
        <Skeleton circle={true} height={24} width={24} />
        <Skeleton width={100} />
      </div>
    </div>
  </div>
);

export default ReservationDateSkeleton;
