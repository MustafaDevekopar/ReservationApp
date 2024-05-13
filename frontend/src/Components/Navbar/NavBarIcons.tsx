
import React, { useState } from "react";
import ActiveIconPc from "./ActiveIconPc";
import { useLocation } from "react-router";
import {NavContentPc} from "./../../Api"


const NavBarIconsMobile: React.FC = () => {
  const location = useLocation();
  const [selectedIcon, setSelectedIcon] = useState<string>(location.pathname);

  const handleIconClick = (path: string) => {
    setSelectedIcon(path);
  };

  return (
    <div className="flex-col fixed top-40 hidden z-40   lg:block xl:block">
       <div className="absolute top-14 right-0 py-8 rounded-l-[40px] w-20 h-auto shadow-[0_3px_40px_-15px_rgba(0,0,0,0.3)] ">
       {NavContentPc.map((navContent) => (
        <ActiveIconPc
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
