import { useEffect, useState } from 'react'
import { FootballFaild } from '../../Reservations';
import CardMini from '../Cards/CardMini';
import { FootbalfieldsGet } from '../../Api';

type Props = {}

const CardMiniList = (props: Props) => {
    const [fields, setFields] = useState<FootballFaild[]>([]); 

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const fieldData = await FootbalfieldsGet(); // Call UsersGet function to fetch users
          setFields(fieldData); // Update state with fetched users
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
  
      fetchUsers(); // Call fetchUsers function when component mounts
    }, []);
  return (

    <div className="grid gap-3 
    grid-cols-2 sm:grid-cols-2  md:grid-cols-2  lg:grid-cols-4 
    mx-3 sm:mx-6  md:mx-12 lg:mr-24 lg:ml-8  w-full my-6 ">
        {fields.map((fld) => (
          <CardMini
            id={fld.id}
            imgSrc={fld.avatar}
            name={fld.name}
            latitude={fld.latitude}
            longitude={fld.longitude}
            />
        ))}        
    </div>
  )
}

export default CardMiniList