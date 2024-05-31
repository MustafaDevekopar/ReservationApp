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
      <button
        type={type}
        onClick={onClick}
        className="bg-Darkgreen hover:bg-WhiteGreen text-white py-2 px-4 w-full rounded-xl"
      >
         {text}
      </button>

  </div>
  )
}

export default ButtonComponent