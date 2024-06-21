
import React, { useEffect, useState } from 'react';
import Card from '../Cards/Card';
import { FieldDataType } from '../../Reservations';
import { FootbalfieldsGet } from '../../Api';

type Props = {
  selectedGovernorate: number | null;
};

const CardList: React.FC<Props> = ({ selectedGovernorate }) => {
  const [fields, setFields] = useState<FieldDataType[]>([]);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const fieldData = await FootbalfieldsGet();
        setFields(fieldData);
      } catch (error) {
        console.error('Error fetching fields:', error);
      }
    };

    fetchFields();
  }, []);

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-3 sm:mx-6 md:mx-12 lg:mr-24 lg:ml-8 w-full">
      {fields
        .filter((field) => !selectedGovernorate || field.userGet.governorateGet.id === selectedGovernorate)
        .map((fld) => (
          <Card
            key={fld.userGet.id}
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
  );
};

export default CardList;
