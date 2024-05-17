
import React, { useState } from "react";
import ActiveIcon from "./ActiveIcon";
import { useLocation } from "react-router";
import {NavContentMobile} from "./../../Api"

const NavBarIconsMobile: React.FC = (): JSX.Element => {
 const location = useLocation();
  const [selectedIcon, setSelectedIcon] = useState<string>(location.pathname);
  
  const handleIconClick = (path: string) => {
    setSelectedIcon(path);
  };

  return (
    <div className="relative lg:hidden xl:hidden">
      <div className="flex flex-row-reverse justify-around w-full fixed right-0 bottom-0  rounded-t-[40px] shadow-[0_3px_40px_-15px_rgba(0,0,0,0.3)] bg-white z-50">
      {NavContentMobile.map((navContent) => (
        <ActiveIcon
          path={navContent.pathAndisSelected}
          isSelected={selectedIcon === navContent.pathAndisSelected}
          iconSrc={navContent.iconSrc}
          outlineIconSrc={navContent.outlineIconSrc}
          label={navContent.label}
          onClick={handleIconClick}
        />
      ))}
      </div>
    </div>
  );
};

export default NavBarIconsMobile;
