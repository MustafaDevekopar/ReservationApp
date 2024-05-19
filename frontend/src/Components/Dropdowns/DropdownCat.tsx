import React, { useEffect, useState } from 'react'
import { Governorate } from '../../Reservations';
import { GovernorateGet } from '../../Api';

type Props = {}

const DropdownCat = (props: Props) => {
  const [goveronrate, setGoveronrate] = useState<Governorate[]>([]); 

  useEffect(() => {
    const fetchGovernorate = async () => {
      try {
        const gData = await GovernorateGet(); // Call UsersGet function to fetch users
        setGoveronrate(gData); // Update state with fetched users
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchGovernorate(); // Call fetchGovernorate function when component mounts
  }, []);
  return (
    <div className="relative w-24 lg:max-w-sm">
            <select className="w-full p-1 text-sm text-DarkGray bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-Darkgreen">
              <option className="text-sm" >المحافظة...</option>
              {goveronrate.map((gover) => (
                <option className="text-sm" 
                       key={gover.id}>
                    {gover.name}
                </option>
              ))}
            
            </select>
        </div>
  )
}

export default DropdownCat