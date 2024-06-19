
import React, { useEffect, useState } from 'react';
import { GetMyReservationsOfField, GetReservationsOfField, GetReservationsOfUser } from '../../Api';
import { ReservaiotionWithField, Reservation, ReservationFieldType } from '../../Reservations';
import { formatDate, formatTime } from '../ReserveElement/Helpers';
import CardReservation from '../Cards/CardReservation';
import { useAuth } from '../../Context/useAuth';
import { boolean } from 'yup';

type Props = {
  filter: 'current' | 'past';
};

const CardReservationsList: React.FC<Props> = ({ filter }: Props) => {
  // const [reservations, setReservations] = useState<ReservaiotionWithField[]>([]);
  const [reservations, setReservations] = useState<ReservationFieldType[]>([]);
  const {isLoggedIn, user, logout} = useAuth();
  const isUserNotField: boolean = user?.accountType === "User";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const reservationsData = await GetReservationsOfUser(1);
        const reservationsData = await GetMyReservationsOfField(isUserNotField);
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
            fieldId={res.id}
            fieldName={isUserNotField ? res.fieldGet.name : res.userGet.name}
            username={isUserNotField ? res.fieldGet.username : res.userGet.username}
            fieldPhonNumber={isUserNotField ? res.fieldGet.phoneNumber : res.userGet.phoneNumber}
            avatar={isUserNotField ? res.fieldGet.avatar : res.userGet.avatar}
          />))
      }
    </div>
  );
};

export default CardReservationsList;
