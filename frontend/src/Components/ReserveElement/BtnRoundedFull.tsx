import React from 'react'

type PtnProps = {
    text:   string;
    bgColor: string;
    Icon: React.ReactNode;
}

const BtnRoundedFull = ({text, bgColor, Icon}: PtnProps) => {
  return (
    <div>
        <button className={`${bgColor} text-white px-6 py-3 rounded-full flex gap-1 items-center`} >
            {text}
            {Icon}
        </button>
    </div>
  )
}

export default BtnRoundedFull