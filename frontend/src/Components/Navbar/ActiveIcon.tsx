
import { Link } from "react-router-dom";

type IconProps = {
  path: string;
  isSelected: boolean;
  iconSrc: string;
  outlineIconSrc: string;
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
    <div className={`${isSelected ? "flex-col mt-4 mb-2" : ""}`}>
      <Link to={path} onClick={() => onClick(path)}>
        {isSelected ? (
          <img
            className="rounded-full mx-5 p-1 border-solid border-2 border-Darkgreen"
            src={iconSrc}
            alt=""
          />
        ) : (
          <img className="m-5 my-4 p-1" src={outlineIconSrc} alt="" />
        )}
      </Link>
      {isSelected ? (
        <span className="text-xs mx-3 font-bold text-Darkgreen">{label}</span>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ActiveIcon;
