import React from 'react';

interface TextareaProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextareaComponent: React.FC<TextareaProps> = ({ label, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm mb-2">{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        className="shadow appearance-none border-2 border-LightXlGray rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-Darkgreen"
        rows={5}
        required
      >

      </textarea>
    </div>
  );
};

export default TextareaComponent;
