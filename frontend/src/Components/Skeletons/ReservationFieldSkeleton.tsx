import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ReservationFieldSkeleton = () => (
  <div className='px-2 py-3 flex flex-col gap-3'>
    <Skeleton height={15} width={100} />
    <div className="flex gap-3">
      <div className="flex rounded-lg overflow-hidden">
        <Skeleton height={50} width={70} className="pt-2"/>
      </div>

      <div className='flex flex-col justify-around text-xs'>
        <Skeleton width={80} />
        <Skeleton width={100} />
      </div>
    </div>
  </div>
);

export default ReservationFieldSkeleton;
