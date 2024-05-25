import React from 'react'

type PtnProps = {
    text:   string;
    bgColor: string;
    Icon: React.ReactNode;
    onClick: () => void;
}

const BtnRoundedFull :React.FC<PtnProps> = ({text, bgColor, Icon, onClick}: PtnProps): JSX.Element => {
  return (
    <div>
        <button className={`${bgColor} text-white px-6 py-2 rounded-full flex gap-1 items-center`} onClick={onClick} >
            {text}
            {Icon}
        </button>
    </div>
  )
}

export default BtnRoundedFull