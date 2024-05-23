import React from 'react';
import InputComponent from '../FormElements/InputComponent';

interface TitleInputProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const TitleInput: React.FC<TitleInputProps> = ({ title, setTitle }) => {
  return (
    <InputComponent
      label='العنوان'
      type='text'
      value={title}
      onChange={(e) => setTitle(e.target.value)} 
    />
  );
};

export default TitleInput;
