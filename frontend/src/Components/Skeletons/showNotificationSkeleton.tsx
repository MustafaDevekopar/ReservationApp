
import CardTeamSkeleton from './CardTeamSkeleton'
import Skeleton from 'react-loading-skeleton'
import ReservationOwnerSkeleton from './ReservationOwnerSkeleton'
import ReservationDateSkeleton from './ReservationDateSkeleton'
import ReservationFieldSkeleton from './ReservationFieldSkeleton'

type Props = {}

const ShowNotificationSkeleton = (props: Props) => {
  return (
    <div className=''>
      <h1 className='text-center py-4'>مشاهدة الإشعار</h1>
    <div className='flex flex-col gap-2 mx-0 sm:mx-6 md:mx-12 lg:mr-40 lg:ml-20 max-w-full bg-white py-4 md:px-4 lg:px-4'>
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full">
        <div>
          <ReservationDateSkeleton />
          <ReservationOwnerSkeleton />
          <ReservationFieldSkeleton />
        </div>

        <div className='p-2 flex flex-col gap-3'>
            <Skeleton height={15} width={200} className='p-2' />
            <CardTeamSkeleton />          
        </div>
      </div>
      <div className='flex flex-col gap-3'>
        <Skeleton height={20} width={200} className='p-2' />
        <div className="flex gap-2 p-2">
            <div className='flex justify-around items-center w-full rounded-full shadow-lg py-4'>
                <div className="rounded-full overflow-hidden flex items-center">
                    <Skeleton height={40} width={120} className='h-full pt-2' />
                </div>
                <div className="rounded-full overflow-hidden flex items-center">
                    <Skeleton height={40} width={120} className='h-full pt-2' />
                </div>
            </div>
        </div>
     </div>

    </div>
  </div>
  )
}

export default ShowNotificationSkeleton