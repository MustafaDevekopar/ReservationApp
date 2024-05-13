
import React, { useState } from "react";
import ActiveIconPc from "./ActiveIconPc";
import { useLocation } from "react-router";

import {HomeIcon, OutlineHomeIcon, FavoriteIcon, OutLineFavoriteIcon,
       PostsIcon,OutlinePostsIcon, SearchIcon, OutlineSearchIcon ,
       ReservationIcon,OutlineReservationIcon} from "./../IconsComponent/IconComponent";




const NavBarIconsMobile: React.FC = () => {
  const location = useLocation();
  const [selectedIcon, setSelectedIcon] = useState<string>(location.pathname);

  const handleIconClick = (path: string) => {
    setSelectedIcon(path);
  };

  const NavContent = [
    { id: 1, pathAndisSelected: "/", iconSrc: <HomeIcon />,outlineIconSrc: <OutlineHomeIcon />, label: "الرئيسيه"},
    { id: 2, pathAndisSelected: "/favorite", iconSrc: <FavoriteIcon />,outlineIconSrc: <OutLineFavoriteIcon />, label: "المفضله"},
    { id: 3, pathAndisSelected: "/posts", iconSrc: <PostsIcon />,outlineIconSrc: <OutlinePostsIcon />, label: "المنشورات"},
    { id: 4, pathAndisSelected: "/search", iconSrc: <SearchIcon />,outlineIconSrc: <OutlineSearchIcon />, label: "البحث"},
    { id: 5, pathAndisSelected: "/reservations/current", iconSrc: <ReservationIcon />,outlineIconSrc: <OutlineReservationIcon />, label: "الحجوزات"},

  ];

  return (
    <div className="flex-col fixed top-40 hidden z-40   lg:block xl:block">
       <div className="absolute top-14 right-0 py-8 rounded-l-[40px] w-20 h-auto shadow-[0_3px_40px_-15px_rgba(0,0,0,0.3)] ">
       {NavContent.map((navContent) => (
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
