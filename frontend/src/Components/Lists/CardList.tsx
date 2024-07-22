
import React, { useEffect, useState } from 'react';
import Card from '../Cards/Card';
import { FieldDataType } from '../../Reservations';
import { FootbalfieldsGet } from '../../Api';
import FullPageLoader from '../FullPageLoader/FullPageLoader';
import CardSkeleton from '../Skeletons/CardSkeleton';

type Props = {
  selectedGovernorate: number | null;
  setSelectedCategory: number | null;
};

const CardList: React.FC<Props> = ({ selectedGovernorate, setSelectedCategory }) => {
  const [fields, setFields] = useState<FieldDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        //setError(null)
        setLoading(true)
        const fieldData = await FootbalfieldsGet();
        setFields(fieldData);
      } catch (error) {
        //setError("الرجاء التاكد من الاتصال بالانترنت");
        console.error('Error fetching fields:', error);
      }finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchFields();
  }, []);

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-3 sm:mx-6 md:mx-12 lg:mr-24 lg:ml-8 w-full">
      {loading === true && <CardSkeleton /> }
      {
      fields
        .filter((field) => !selectedGovernorate || field.userGet.governorateGet.id === selectedGovernorate)
        .filter((field) => !setSelectedCategory || field.userGet.categoryGet.id === setSelectedCategory)
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
