import React from 'react';

interface TextInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputComponent: React.FC<TextInputProps> = ({ label,type, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="shadow appearance-none border-2 border-LightXlGray rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-Darkgreen"
        required
      />
    </div>
  );
};

export default InputComponent;
