

import React from 'react';

type Props = {
  isReserved: boolean;
  visibleValue: string;
  hiddenValue: string;
  isSelected: boolean;
  onClick: (hiddenVal: string) => void;
};

const BtnDateTime: React.FC<Props> = ({ isReserved, visibleValue, hiddenValue, isSelected, onClick }: Props): JSX.Element => {
  const handleClick = () => {
    if (!isReserved) {
      onClick(hiddenValue);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`text-white text-xs m-1 py-2  text-center rounded-full
      ${
        isReserved
          ? 'bg-WhiteRed cursor-not-allowed'
          : isSelected
          ? 'bg-WhiteBlue'
          : 'bg-WhiteGreen'
      }`}
      disabled={isReserved}
    >
      {visibleValue}
    </button>
  );
};

export default BtnDateTime;

