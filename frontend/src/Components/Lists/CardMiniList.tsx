import { useEffect, useState } from 'react'
import { FieldDataType } from '../../Reservations';
import CardMini from '../Cards/CardMini';
import { FootbalfieldsGet } from '../../Api';
import FullPageLoader from '../FullPageLoader/FullPageLoader';

type Props = {}

const CardMiniList = (props: Props) => {
    const [fields, setFields] = useState<FieldDataType[]>([]); 
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          setLoading(true);
          const fieldData = await FootbalfieldsGet(); // Call UsersGet function to fetch users
          setFields(fieldData); // Update state with fetched users
        } catch (error) {
          console.error('Error fetching users:', error);
        }finally{
          setLoading(false);
        }
      };
  
      fetchUsers(); // Call fetchUsers function when component mounts
    }, []);
  return (

    <div className="grid gap-3 
    grid-cols-2 sm:grid-cols-2  md:grid-cols-2  lg:grid-cols-4 
    mx-3 sm:mx-6  md:mx-12 lg:mr-24 lg:ml-8  w-full my-6 ">
        {loading == true && <FullPageLoader /> }
        {fields.map((fld) => (
          <CardMini
            id={fld.userGet.id}
            imgSrc={fld.userGet.avatar}
            name={fld.userGet.name}
            latitude={fld.userGet.latitude}
            longitude={fld.userGet.longitude}
            />
        ))}        
    </div>
  )
}

export default CardMiniList