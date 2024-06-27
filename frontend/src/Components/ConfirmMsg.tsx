import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

interface DeleteConfirmationProps {
  id: number;
  title: string;
  text: string;
  onDelete: (reservationId: number) => void;
}

const ConfirmMsg: React.FC<DeleteConfirmationProps> = ({ id, title, text , onDelete }) => {
  const handleDeleteClick = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui p-4 bg-white rounded-xl shadow-lg ">
            <h2>{title}</h2>
            <p className="my-4 mx-8">{text}</p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-1 bg-Darkgreen text-white rounded-3xl"
                onClick={onClose}
              >
                لا
              </button>
              <button
                className="px-4 py-1 bg-Darkgreen text-white rounded-3xl"
                onClick={() => {
                  onDelete(id);
                  onClose();
                }}
              >
                نعم
              </button>
            </div>
          </div>
        );
      },
    });
  };

  return (
    <button
      className="px-3 py-2 rounded-full m bg-Darkgreen text-white"
      onClick={handleDeleteClick}
    >
      حذف
    </button>
  );
};

export default ConfirmMsg;
