import React from 'react';
import ButtonComponent from '../FormElements/ButtonComponent';

interface SubmitButtonProps {
  onSubmit: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onSubmit }) => {
  return (
    <div className="flex items-center my-8">
    <button
      type="submit"
      onClick={onSubmit}
      className="bg-Darkgreen hover:bg-WhiteGreen text-white py-2 px-4 w-full rounded-xl"
    >
        اضافة منشور
    </button>
  </div>
  );
};

export default SubmitButton;
