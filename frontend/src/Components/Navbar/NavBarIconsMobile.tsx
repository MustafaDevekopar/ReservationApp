
import React, { useState } from "react";
import ActiveIcon from "./ActiveIcon";
import { useLocation } from "react-router";

import {GreenHomeIcon, OutlineHomeIcon, GreenFavoriteIcon, OutLineFavoriteIcon,
        GreenPostsIcon,OutlinePostsIcon, GreenSearchIcon, OutlineSearchIcon ,
        GreenReservationIcon,OutlineReservationIcon} from "./../IconsComponent/IconComponent";

const NavBarIconsMobile: React.FC = () => {
 const location = useLocation();
  const [selectedIcon, setSelectedIcon] = useState<string>(location.pathname);
  
  const handleIconClick = (path: string) => {
    setSelectedIcon(path);
  };

  const NavContent = [
    { id: 1, pathAndisSelected: "/", iconSrc: <GreenHomeIcon />,outlineIconSrc: <OutlineHomeIcon />, label: "الرئيسيه"},
    { id: 2, pathAndisSelected: "/favorite", iconSrc: <GreenFavoriteIcon />,outlineIconSrc: <OutLineFavoriteIcon />, label: "المفضله"},
    { id: 3, pathAndisSelected: "/posts", iconSrc: <GreenPostsIcon />,outlineIconSrc: <OutlinePostsIcon />, label: "المنشورات"},
    { id: 4, pathAndisSelected: "/search", iconSrc: <GreenSearchIcon />,outlineIconSrc: <OutlineSearchIcon />, label: "البحث"},
    { id: 5, pathAndisSelected: "/reservations/current", iconSrc: <GreenReservationIcon />,outlineIconSrc: <OutlineReservationIcon />, label: "الحجوزات"},

  ];

  return (
    <div className="relative lg:hidden xl:hidden">
      <div className="flex flex-row-reverse justify-around w-full fixed right-0 bottom-0  rounded-t-[40px] shadow-[0_3px_40px_-15px_rgba(0,0,0,0.3)] bg-white z-50">
      {NavContent.map((navContent) => (
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
