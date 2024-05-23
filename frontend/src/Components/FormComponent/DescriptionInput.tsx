import React from 'react';
import TextareaComponent from '../FormElements/TextareaComponent';

interface DescriptionInputProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const DescriptionInput: React.FC<DescriptionInputProps> = ({ text, setText }) => {
  return (
    <TextareaComponent 
      label='الوصف'
      value={text}
      onChange={(e) => setText(e.target.value)} 
    />
  );
};

export default DescriptionInput;
