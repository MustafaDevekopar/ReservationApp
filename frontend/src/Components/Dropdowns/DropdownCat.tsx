
import React, { useEffect, useState } from 'react';
import { Governorate } from '../../Reservations';
import { GovernorateGet } from '../../Api';

type Props = {
  selectedGovernorate: number | null;
  setSelectedGovernorate: (id: number | null) => void;
};

const DropdownCat: React.FC<Props> = ({ selectedGovernorate, setSelectedGovernorate }) => {
  const [governorates, setGovernorates] = useState<Governorate[]>([]);

  useEffect(() => {
    const fetchGovernorate = async () => {
      try {
        const gData = await GovernorateGet();
        setGovernorates(gData);
      } catch (error) {
        console.error('Error fetching governorates:', error);
      }
    };

    fetchGovernorate();
  }, []);

  return (
    <div className="relative w-24 lg:max-w-sm">
      <select
        className="w-full p-1 text-sm text-DarkGray bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-Darkgreen"
        value={selectedGovernorate ?? ''}
        onChange={(e) => setSelectedGovernorate(Number(e.target.value) || null)}
      >
        <option className="text-sm" value="">
          المحافظة...
        </option>
        {governorates.map((governorate) => (
          <option className="text-sm" key={governorate.id} value={governorate.id}>
            {governorate.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownCat;
