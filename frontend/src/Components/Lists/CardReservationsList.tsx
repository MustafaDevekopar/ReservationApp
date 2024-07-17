
import React, { useEffect, useState } from 'react';
import { GetMyReservationsOfField, GetReservationsOfField, GetReservationsOfUser } from '../../Api';
import { ReservaiotionWithField, Reservation, ReservationFieldType } from '../../Reservations';
import { formatDate, formatTime } from '../ReserveElement/Helpers';
import CardReservation from '../Cards/CardReservation';
import { useAuth } from '../../Context/useAuth';
import { boolean } from 'yup';
import FullPageLoader from '../FullPageLoader/FullPageLoader';

type Props = {
  filter: 'current' | 'past';
};

const CardReservationsList: React.FC<Props> = ({ filter }: Props) => {
  // const [reservations, setReservations] = useState<ReservaiotionWithField[]>([]);
  const [reservations, setReservations] = useState<ReservationFieldType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const {isLoggedIn, user, logout} = useAuth();
  const IsFieldOwner: boolean = user?.accountType === "FieldOwner";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const reservationsData = await GetMyReservationsOfField(IsFieldOwner);
        setReservations(reservationsData);
      } catch (error) {
        console.error('Error fetching reservation status or reservations:', error);
      }finally{
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const now = new Date();
  //now.setHours(now.getHours() + 3); dont need to add 3 hours time in baghdad 
  const filteredReservations = reservations.filter((res) =>
    filter === 'current' ? new Date(res.dateTime) >= now : new Date(res.dateTime) < now
  );

  return (
    <div className="grid gap-3 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mx-5 sm:mx-6 md:mx-12 lg:mr-40 lg:ml-20 w-full my-6">
      {loading == true && <FullPageLoader /> }
      {filteredReservations.map((res) => ( 
          <CardReservation
            key={res.id}
            dateformat={formatDate(new Date(res.dateTime))}
            dateTimeformat={formatTime(new Date(res.dateTime))}
            reservationId={res.id}
            userId={res.userGet.id}
            fieldId={res.fieldGet.id}
            fieldName={IsFieldOwner ? res.userGet.name : res.fieldGet.name}
            username={IsFieldOwner ? res.userGet.username : res.fieldGet.username}
            fieldPhonNumber={IsFieldOwner ? res.userGet.phoneNumber : res.fieldGet.phoneNumber}
            avatar={IsFieldOwner ? res.userGet.avatar : res.fieldGet.avatar}
          />))
      }
    </div>
  );
};

export default CardReservationsList;
