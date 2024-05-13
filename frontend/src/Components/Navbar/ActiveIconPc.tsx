
import { Link } from "react-router-dom";

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
  return (
    <div className={`${isSelected && "flex items-center justify-center flex-col  py-2 bg-Darkgreen rounded-l-3xl" }`}>
      <Link to={path} onClick={() => onClick(path)}>
        {isSelected ? ( 
          <p className="mx-5 p-1 rounded-full border-solid border-2 border-white ">
            { iconSrc}
          </p>
        ) : (
          <p className="m-5 my-8 p-1">
            {outlineIconSrc}
          </p>
          
        )}
      </Link>
      { isSelected && <span className="text-xs mx-3 font-bold text-white">{label}</span> }
    </div>
  );
};

export default ActiveIcon;
