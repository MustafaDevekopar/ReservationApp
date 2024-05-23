import React from 'react'

type ButtonProps = {
    text: string;
    type?: "button" | "submit" | "reset" | undefined; 
    onClick: () => void;
}

const ButtonComponent: React.FC<ButtonProps> = ({
    text,
    onClick,
    type,
}): JSX.Element => {
  return (
    <div className="flex items-center my-8">

  </div>
  )
}

export default ButtonComponent