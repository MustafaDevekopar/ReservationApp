
import React, { useEffect, useState } from 'react';
import { GetReservationsOfUser } from '../../Api';
import { ReservaiotionWithField } from '../../Reservations';
import { formatDate, formatTime } from '../ReserveElement/Helpers';
import CardReservation from '../Cards/CardReservation';

type Props = {
  filter: 'current' | 'past';
};

const CardReservationsList: React.FC<Props> = ({ filter }: Props) => {
  const [reservations, setReservations] = useState<ReservaiotionWithField[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reservationsData = await GetReservationsOfUser(1);
        setReservations(reservationsData);
      } catch (error) {
        console.error('Error fetching reservation status or reservations:', error);
      }
    };

    fetchData();
  }, []);

  const now = new Date();
  now.setHours(now.getHours() + 3); //UTC + 3 time in baghdad 

  const filteredReservations = reservations.filter((res) =>
    filter === 'current' ? new Date(res.dateTime) >= now : new Date(res.dateTime) < now
  );

  return (
    <div className="grid gap-3 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mx-5 sm:mx-6 md:mx-12 lg:mr-40 lg:ml-20 w-full my-6">
      {filteredReservations.map((res) => (
        <CardReservation
          key={res.id}
          dateformat={formatDate(new Date(res.dateTime))}
          dateTimeformat={formatTime(new Date(res.dateTime))}
          fieldId={res.fields.id}
          fieldName={res.fields.name}
          fieldPhonNumber={res.fields.phoneNumbr}
        />
      ))}
    </div>
  );
};

export default CardReservationsList;
