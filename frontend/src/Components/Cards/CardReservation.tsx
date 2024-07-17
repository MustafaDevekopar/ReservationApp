
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { DefaultAvatar } from '../../assets/Image';
import { XIcon, PhoneBlackIcon } from './../../Components/IconsComponent/IconComponent';
import { DeleteReservation } from '../../Api';
import ConfirmMsg from '../ConfirmMsg';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/useAuth';

interface ReservationsProps {
  dateformat: string;
  dateTimeformat: string;
  reservationId: number;
  userId: number;
  fieldId: number;
  fieldName: string;
  username: string;
  fieldPhonNumber: string;
  avatar: string | null;
}

const CardReservation: React.FC<ReservationsProps> = ({
  dateformat,
  dateTimeformat,
  reservationId,
  userId,
  fieldId,
  fieldName,
  username,
  fieldPhonNumber,
  avatar,
}): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);

  const {isLoggedIn, user, logout} = useAuth();
 const isFieldOwner: boolean = user?.accountType ==="FieldOwner";

  const handleDelete = (reservationId: number) => {
    try {
      setLoading(true);
      DeleteReservation(String(reservationId))
        .then(response => {
          toast.success(response);
        })
        .catch(error => {
          console.error('Error Deleting:', error);
          toast.error('حدث خطأ . الرجاء المحاولة مرة أخرى.');
        })
        .finally(() => {
          setLoading(false);
          window.location.reload();
        });
    } catch (error) {
      console.error('Error Deleting:', error);
      toast.error('حدث خطأ . الرجاء المحاولة مرة أخرى.');
      setLoading(false);
    }
  };

  return (
    <div className="flex rounded-3xl h-[120px] w-full overflow-hidden" key={reservationId}>
      {/* right */}
      <div className="flex-[2] flex flex-col items-center justify-center bg-Darkgreen text-xs text-white">
        <span className="py-2">{dateformat}</span>
        <span className="py-2">{dateTimeformat}</span>
      </div>
      {/* left */}
      <div className="flex-[3] flex flex-col text-xs p-2 bg-white">
        <div className="flex-1">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <div className="flex flex-col justify-center items-center">
                <img
                  src={avatar === null ? DefaultAvatar : `data:image/png;base64,${avatar}`}
                  alt="صورة"
                  className="object-cover min-w-10 w-10 h-10 rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs">{fieldName}</span>
                <span className="text-xs font-buld">{username}</span>
              </div>
            </div>

            <ConfirmMsg 
              id={reservationId} 
              title="تاكيد الحذف" 
              text="هل أنت متأكد أنك تريد الحذف؟" 
              btnText={<XIcon className="w-6 h-6 rounded-full p-1 shadow-md" />} 
              onDelete={handleDelete} 
            />

          </div>
          <div className="float-end">
            <span className="py-2 text-DarkGray">رقم الحجز {reservationId}</span>
          </div>
        </div>

        <div className="flex-1 inline-flex justify-between items-center">
          <div className="flex items-center gap-2">
            <PhoneBlackIcon className="w-8 h-8 rounded-full p-1 bg-white shadow-md" />
            <span>{fieldPhonNumber}</span>
          </div>
            {
              !isFieldOwner &&            
              <Link to={`../../AddNotification/fieldId/${fieldId}/reservationId/${reservationId}/userId/${userId}`}
                className="bg-Darkgreen rounded-full text-white px-3 py-2">
                اشعار
              </Link>
            }

        </div>
      </div>
    </div>
  );
};

export default CardReservation;
