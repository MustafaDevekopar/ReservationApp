
import ExplanatoryIcons from '../Components/ReserveElement/ExplanatoryIcons'

import ReservDate from '../Components/ReserveElement/ReservDate'
import FieldInformation from '../Components/ReserveElement/FieldInformation'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { FieldDataType, Reservation } from '../Reservations'
import { FootbalfieldsGetById, GetReservationsOfField } from '../Api'
import FullPageLoader from '../Components/FullPageLoader/FullPageLoader'

type Props = {}

const ReservePage: React.FC<Props> = (props: Props): JSX.Element => {
  const { fieldId } = useParams<{ fieldId?: string }>(); 
const [fieldData, setFieldData] = useState<FieldDataType | null>(null); 
const [reservationsData, setReservationsData] = useState<Reservation[]>([]);
const [loading, setLoading] = useState<boolean>(false);

useEffect(() => {
  const fetchData = async () => {
    try {
      if (!fieldId) return; 
      setLoading(true);
      const data = await FootbalfieldsGetById(parseInt(fieldId)); 
      setFieldData(data); 

      const reservationsData = await GetReservationsOfField(Number(fieldId));
      setReservationsData(reservationsData);
    } catch (error) {
      console.error('Error fetching football field data:', error);
    }finally{
      setLoading(false);
    }
  };

  fetchData();
}, [fieldId]); 
  return (
    <div className="flex flex-col lg:gap-8 xl:gap-8 items-center my-8 mx-3 sm:mx-4  md:mx-12 lg:mx-40">
        {loading && <FullPageLoader />}
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
        <FieldInformation fieldData={fieldData}/>
        <ReservDate 
          fieldData={fieldData}
          reservationsData={reservationsData}/>
        {/* <ConfirmOrBackBox /> */}
        {/* <ToastContainer /> */}
    </div>
  )
}

export default ReservePage