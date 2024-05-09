import React, { useState } from "react";
import ActiveIcon from "./ActiveIcon";

// Import icons
import HomeIcon from "./../../Assets/Icons/HomeIcon.svg";
import outlineHomeIcon from "./../../Assets/Icons/outlineHomeIcon.svg";
import OutlineLikeIcon from "./../../Assets/Icons/outlineLikeIcon.svg";
import LikeIcon from "./../../Assets/Icons/FavaratIcon.svg";
import PostsIcon from "./../../Assets/Icons/PostsIcon.svg";
import outlinePostsIcon from "./../../Assets/Icons/outlinePostsIcon.svg";
import SearchSolidIcon from "./../../Assets/Icons/SearchSolidIcon.svg";
import OutlineSearchIcon from "./../../Assets/Icons/OutlineSearchIcon.svg";
import reservationIcon from "./../../Assets/Icons/ReservationIcon.svg";
import OutlineReservationIcon from "./../../Assets/Icons/OutlineReservationIcon.svg";

const NavBarIconsMobile: React.FC = () => {
  const [selectedIcon, setSelectedIcon] = useState<string>("/");

  const handleIconClick = (path: string) => {
    setSelectedIcon(path);
  };

  return (
    <div className="relative lg:hidden xl:hidden">
      <div className="flex flex-row-reverse justify-around w-full fixed right-0 bottom-0  rounded-t-[40px] shadow-[0_3px_40px_-15px_rgba(0,0,0,0.3)] bg-white z-50">
        <ActiveIcon
          path="/"
          isSelected={selectedIcon === "/"}
          iconSrc={HomeIcon}
          outlineIconSrc={outlineHomeIcon}
          label="الرئيسيه"
          onClick={handleIconClick}
        />
        <ActiveIcon
          path="/favorite"
          isSelected={selectedIcon === "/favorite"}
          iconSrc={LikeIcon}
          outlineIconSrc={OutlineLikeIcon}
          label="المفضله"
          onClick={handleIconClick}
        />
        <ActiveIcon
          path="/"
          isSelected={selectedIcon === "/"}
          iconSrc={PostsIcon}
          outlineIconSrc={outlinePostsIcon}
          label="المنشورات"
          onClick={handleIconClick}
        />
        <ActiveIcon
          path="/search"
          isSelected={selectedIcon === "/search"}
          iconSrc={SearchSolidIcon}
          outlineIconSrc={OutlineSearchIcon}
          label="البحث"
          onClick={handleIconClick}
        />
        <ActiveIcon
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
