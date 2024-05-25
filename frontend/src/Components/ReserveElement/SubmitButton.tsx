import React from 'react';

type ButtonProps = {
  onClick: () => void;
  text: string;
};

const SubmitButton: React.FC<ButtonProps> = ({ onClick, text }) => {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={onClick}>
      {text}
    </button>
  );
};

export default SubmitButton;