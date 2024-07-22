import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CardTeamSkeleton = () => (
  <div className="relative rounded-3xl overflow-hidden shadow-lg w-full mb-4">
    <Skeleton height={200} className="aspect-[7/3] w-full object-cover p-1" />
    <div className="px-4 pt-2 pb-5">
      <div className="flex justify-between items-center  ">
        <div className='w-[50%]'>
          <Skeleton width="80%" height={14}  className="mx-2  w-full" />
        </div>
        
        <span className="left-0 pr-4 relative flex float-end ">
          <Skeleton circle={true} height={40} width={40}  className='-mr-5 border-1 border-white border'/>
          <Skeleton circle={true} height={40} width={40}  className='-mr-5 border-1 border-white border'/>
          <Skeleton circle={true} height={40} width={40}  className='-mr-5 border-1 border-white border'/>
        </span>
      </div>
    </div>
  </div>
);

export default CardTeamSkeleton;
