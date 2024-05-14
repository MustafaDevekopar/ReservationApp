

type BtnDateTimeProps = {
    isReserved: boolean;
    DateOrTime: string;
    isSelected: boolean;
    onClick: (DateOrTime: string) => void;
}

const BtnDateTime = ({isReserved, DateOrTime, isSelected, onClick}: BtnDateTimeProps) => {
  return (
    <button 
      onClick={()=> onClick(DateOrTime)} 
      className={`text-white text-xs m-1 py-2 px-4 rounded-full
            ${isReserved 
              ? ( "bg-WhiteRed cursor-vertical-text")
              : (
                  isSelected ? ("bg-WhiteBlue") : ("bg-WhiteGreen")
                )
          }`} 
    >
      {DateOrTime}
    </button>
  )
}

export default BtnDateTime