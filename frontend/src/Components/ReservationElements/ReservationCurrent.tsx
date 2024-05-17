
import CardReservation from '../Cards/CardReservation'

type Props = {}

const ReservationCurrent: React.FC<Props> = (props: Props): JSX.Element => {
  return (
    <div className="flex justify-center items-center w-full">
    <div className="grid gap-3
    grid-cols-1 sm:grid-cols-1  md:grid-cols-2  lg:grid-cols-2 
    mx-5 sm:mx-6  md:mx-12 lg:mr-40 lg:ml-20  w-full my-6 ">
      {/* reservation card */}
      <CardReservation />
      <CardReservation />

   </div>
</div>
  )
}

export default ReservationCurrent