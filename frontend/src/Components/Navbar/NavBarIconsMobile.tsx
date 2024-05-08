import HomeIcon from "./../../Assets/Icons/HomeIcon.svg"
import outlineHomeIcon from "./../../Assets/Icons/outlineHomeIcon.svg"

import OutlineLikeIcon from "./../../Assets/Icons/outlineLikeIcon.svg"
import LikeIcon from "./../../Assets/Icons/FavaratIcon.svg"

import PostsIcon from "./../../Assets/Icons/PostsIcon.svg"
import outlinePostsIcon from "./../../Assets/Icons/outlinePostsIcon.svg"

import SearchSolidIcon from "./../../Assets/Icons/SearchSolidIcon.svg"
import OutlineSearchIcon from "./../../Assets/Icons/OutlineSearchIcon.svg"

import reservationIcon from "./../../Assets/Icons/ReservationIcon.svg"
import OutlineReservationIcon from "./../../Assets/Icons/OutlineReservationIcon.svg"

import { Link } from "react-router-dom"
import { useState } from "react"

type Props = {}


// const NavBarIconsMobile = (props: Props) => {
  const NavBarIconsMobile: React.FC = (props: Props) => {
    const [selectedIcon, setSelectedIcon] = useState<string>("/");
  
    const handleIconClick = (path: string) => {
      setSelectedIcon(path);
    };
  return (
    <div className="relative lg:hidden xl:hidden ">
        <div className="flex flex-row-reverse justify-around w-full fixed right-0 bottom-0  rounded-t-[40px] shadow-[0_3px_40px_-15px_rgba(0,0,0,0.3)] bg-white z-50">
            {/* <div className=" flex-col mt-4 mb-2">
              <Link to="/" onClick={() => handleIconClick("/")}> 
                <img className="mx-5 p-1 rounded-full border-solid border-2 border-Darkgreen" src={HomeIcon} alt="" />
              </Link>
              <span className="text-xs mx-3 font-bold text-Darkgreen">الرئيسيه</span>
            </div> */}


            <div className={`${ selectedIcon === "/" ? "flex-col mt-4 mb-2" : ""}`}>
              <Link to="/" onClick={() => handleIconClick("/")}> 
              { selectedIcon === "/" 
              ?  <img className="rounded-full mx-5 p-1 border-solid border-2 border-Darkgreen" src={HomeIcon} alt="" /> 
              : <img className="m-5 my-4 p-1" src={ outlineHomeIcon} alt="" />}
              </Link>
                {selectedIcon === "/" ?  <span className="text-xs mx-3 font-bold text-Darkgreen">المفضله</span> : <></>}
            </div>

            <div className={`${ selectedIcon === "/favorite" ? "flex-col mt-4 mb-2" : ""}`}>
              <Link to="/favorite" onClick={() => handleIconClick("/favorite")}> 
              { selectedIcon === "/favorite" 
              ?  <img className="rounded-full mx-5 p-1 border-solid border-2 border-Darkgreen" src={LikeIcon} alt="" /> 
              : <img className="m-5 my-4 p-1" src={ OutlineLikeIcon} alt="" />}
              </Link>
                {selectedIcon === "/favorite" ?  <span className="text-xs mx-3 font-bold text-Darkgreen">المفضله</span> : <></>}
            </div>

            <div className={`${ selectedIcon === "/posts" ? "flex-col mt-4 mb-2" : ""}`}>
              <Link to="/" onClick={() => handleIconClick("/posts")}> 
              { selectedIcon === "/posts" 
              ?  <img className="rounded-full mx-5 p-1 border-solid border-2 border-Darkgreen" src={PostsIcon} alt="" /> 
              : <img className="m-5 my-4 p-1" src={ outlinePostsIcon} alt="" />}
              </Link>
                {selectedIcon === "/posts" ?  <span className="text-xs mx-3 font-bold text-Darkgreen">المنشورات</span> : <></>}
            </div>

            
            <div className={`${ selectedIcon === "/search" ? "flex-col mt-4 mb-2" : ""}`}>
              <Link to="/search" onClick={() => handleIconClick("/search")}> 
              { selectedIcon === "/search" 
              ?  <img className="rounded-full mx-5 p-1 border-solid border-2 border-Darkgreen" src={SearchSolidIcon} alt="" /> 
              : <img className="m-5 my-4 p-1" src={ OutlineSearchIcon} alt="" />}
              </Link>
                {selectedIcon === "/search" ?  <span className="text-xs mx-3 font-bold text-Darkgreen">البحث</span> : <></>}
            </div>


            <div className={`${ selectedIcon === "/Reservation" ? "flex-col mt-4 mb-2" : ""}`}>
              <Link to="/" onClick={() => handleIconClick("/Reservation")}> 
              { selectedIcon === "/Reservation" 
              ?  <img className="rounded-full mx-5 p-1 border-solid border-2 border-Darkgreen" src={ reservationIcon} alt="" /> 
              : <img className="m-5 my-4 p-1" src={OutlineReservationIcon} alt="" />}
              </Link>
                {selectedIcon === "/Reservation" ?  <span className="text-xs mx-3 font-bold text-Darkgreen">الحجوزات</span> : <></>}
            </div>


        </div>
    </div>

  )
}

export default NavBarIconsMobile