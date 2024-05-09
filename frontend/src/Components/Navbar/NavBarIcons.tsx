
import React, { useState } from "react";
import ActiveIconPc from "./ActiveIconPc";

// Import icons
import HomeIcon from "./../../Assets/Icons/LightHome.svg";
import outlineHomeIcon from "./../../Assets/Icons/outlineHomeIcon.svg";
import LikeIcon from "./../../Assets/Icons/LightFavorite.svg";
import OutlineLikeIcon from "./../../Assets/Icons/outlineLikeIcon.svg";

import PostsIcon from "./../../Assets/Icons/LightPost.svg";
import outlinePostsIcon from "./../../Assets/Icons/outlinePostsIcon.svg";
import SearchSolidIcon from "./../../Assets/Icons/LightSearch.svg";
import OutlineSearchIcon from "./../../Assets/Icons/OutlineSearchIcon.svg";
import reservationIcon from "./../../Assets/Icons/LightReservation.svg";
import OutlineReservationIcon from "./../../Assets/Icons/OutlineReservationIcon.svg";

const NavBarIconsMobile: React.FC = () => {
  const [selectedIcon, setSelectedIcon] = useState<string>("/");

  const handleIconClick = (path: string) => {
    setSelectedIcon(path);
  };

  return (
    <div className="flex-col relative top-20 hidden lg:block xl:block bg-red-300">
       <div className="absolute top-14 right-0 rounded-l-[40px] h-auto shadow-[0_3px_40px_-15px_rgba(0,0,0,0.3)] w">
        <ActiveIconPc
          path="/"
          isSelected={selectedIcon === "/"}
          iconSrc={HomeIcon}
          outlineIconSrc={outlineHomeIcon}
          label="الرئيسيه"
          onClick={handleIconClick}
        />
        <ActiveIconPc
          path="/favorite"
          isSelected={selectedIcon === "/favorite"}
          iconSrc={LikeIcon}
          outlineIconSrc={OutlineLikeIcon}
          label="المفضله"
          onClick={handleIconClick}
        />
        <ActiveIconPc
          path="/"
          isSelected={selectedIcon === "/"}
          iconSrc={PostsIcon}
          outlineIconSrc={outlinePostsIcon}
          label="المنشورات"
          onClick={handleIconClick}
        />
        <ActiveIconPc
          path="/search"
          isSelected={selectedIcon === "/search"}
          iconSrc={SearchSolidIcon}
          outlineIconSrc={OutlineSearchIcon}
          label="البحث"
          onClick={handleIconClick}
        />
        <ActiveIconPc
          path="/"
          isSelected={selectedIcon === "/"}
          iconSrc={reservationIcon}
          outlineIconSrc={OutlineReservationIcon}
          label="الحجوزات"
          onClick={handleIconClick}
        />
      </div>
    </div>
  );
};

export default NavBarIconsMobile;
