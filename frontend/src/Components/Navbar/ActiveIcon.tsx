
import { Link, useLocation } from "react-router-dom";

type IconProps = {
  path: string;
  isSelected: boolean;
  iconSrc: React.ReactNode;
  outlineIconSrc: React.ReactNode;
  label: string;
  onClick: (path: string) => void;
};

const ActiveIcon: React.FC<IconProps> = ({
  path,
  isSelected,
  iconSrc,
  outlineIconSrc,
  label,
  onClick,
}) => {
  const location = useLocation();
  return (
    <div className={`flex  flex-col gap-1 mb-2 mt-2 ${isSelected && "mt-4 mb-2" }`}>
      <Link to={path} onClick={() => onClick(path)} >
        {isSelected ? (
          <div className=" rounded-full mx-5 p-1 border-solid border-2 border-Darkgreen">
             {iconSrc}
          </div>
        ) : (
          <div className="m-5 my-4 p-">
             {outlineIconSrc} 
          </div>
        )}
      </Link>
      {isSelected && <span className="text-xs text-center font-bold text-Darkgreen">{label}</span>}
    </div>
  );
};

export default ActiveIcon;
