
import ExplanatoryIcons from '../Components/ReserveElement/ExplanatoryIcons'
import ConfirmOrBackBox from '../Components/ReserveElement/ConfirmOrBackBox'
import ReservDate from '../Components/ReserveElement/ReservDate'
import FieldInformation from '../Components/ReserveElement/FieldInformation'

type Props = {}

const ReservePage: React.FC<Props> = (props: Props): JSX.Element => {
  return (
    <div className="flex flex-col lg:gap-8 xl:gap-8 items-center my-8 mx-3 sm:mx-4  md:mx-12 lg:mx-40">
        <div className="flex justify-center items-center gap-6 mb-6">
            <ExplanatoryIcons 
              Color='bg-WhiteGreen'
              Text='متاح' />
            <ExplanatoryIcons 
              Color='bg-WhiteRed'
              Text='محجوز' />
            <ExplanatoryIcons 
              Color='bg-WhiteYellow'
              Text='مغلق' />
        </div>
        <FieldInformation />
        <ReservDate />
        {/* <ConfirmOrBackBox /> */}
    </div>
  )
}

export default ReservePage