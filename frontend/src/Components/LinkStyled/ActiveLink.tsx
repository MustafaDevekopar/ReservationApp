import React from 'react'
import { Link } from "react-router-dom";

    type IconProps = {
      path: string;
      isSelected: boolean;
      TitleLink: string;
      onClick: (path: string) => void;
    };
    
    const ActiveLink: React.FC<IconProps> = ({
      path,
      isSelected,
      TitleLink,
      onClick,
    }) => {
      return (
        <div>
            <Link 
                to={path} 
                onClick={() => onClick(path)}
                className={`${isSelected ? "border-b-2 text-Darkgreen border-Darkgreen" : "text-LightTextCol"} p-2 `}>
                <span className="">{TitleLink} </span>
            </Link>
        </div>
      );
    };
export default ActiveLink