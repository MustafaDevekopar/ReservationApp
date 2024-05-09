
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
    <div className={`${isSelected ? "flex-col py-1 bg-Darkgreen rounded-l-xl" : ""}`}>
      <Link to={path} onClick={() => onClick(path)}>
        {isSelected ? (
          <img
            className="mx-5 p-1 rounded-full border-solid border-2 border-white "
            src={iconSrc}
            alt=""
          />
        ) : (
          <img className="m-5 my-8 p-1" src={outlineIconSrc} alt="" />
        )}
      </Link>
      {isSelected ? (
        <span className="text-xs mx-3 font-bold text-white">{label}</span>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ActiveIcon;
