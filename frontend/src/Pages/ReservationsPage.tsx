
import CardReservation from "../Components/Cards/CardReservation"
type Props = {}

const ReservationsPage = (props: Props) => {

  return (
  
    <div className=" flex justify-center items-center w-full ">
        <div className="grid gap-3 
        grid-cols-1 sm:grid-cols-1  md:grid-cols-2  lg:grid-cols-2 
        mx-3 sm:mx-6  md:mx-12 lg:mr-24 lg:ml-8  w-full my-6 ">
          {/* reservation card */}
          <CardReservation />
          <CardReservation />
          <CardReservation />
          <CardReservation />
          <CardReservation />
          <CardReservation />
          <CardReservation />

       </div>
    </div>

  )
}

export default ReservationsPage