import { useEffect, useState } from 'react'
import Card from '../Cards/Card'
import { FieldDataType} from '../../Reservations';
import { FootbalfieldsGet } from '../../Api';

type Props = {}

const CardList = (props: Props) => {
    const [fields, setFields] = useState<FieldDataType[]>([]); 

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

        <div className="grid gap-4 
        sm:grid-cols-1  md:grid-cols-2  lg:grid-cols-3 
        mx-3 sm:mx-6  md:mx-12 lg:mr-24 lg:ml-8  w-full ">
        {fields.map((fld) => (
          <Card 
            id={fld.userGet.id}
            imgSrc={fld.userGet.avatar}
            fieldName={fld.userGet.name}
            location={fld.userGet.location}
            phoneNumber={fld.phoneNumber}
            latitude={fld.userGet.latitude}
            longitude={fld.userGet.longitude}
            />
        ))}        
    </div>
  )
}

export default CardList