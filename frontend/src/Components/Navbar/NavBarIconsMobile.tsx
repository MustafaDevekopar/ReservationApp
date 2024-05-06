import HomeIcon from "./../../Assets/Icons/HomeIcon.svg"
import OutlineLikeIcon from "./../../Assets/Icons/outlineLikeIcon.svg"
import OutlineSearchIcon from "./../../Assets/Icons/OutlineSearchIcon.svg"
import OutlineReservationIcon from "./../../Assets/Icons/OutlineReservationIcon.svg"
import outlinePostsIcon from "./../../Assets/Icons/outlinePostsIcon.svg"

type Props = {}

const NavBarIconsMobile = (props: Props) => {
  return (
    <div className="relative lg:hidden xl:hidden ">
        <div className="flex flex-row-reverse justify-around w-full fixed right-0 bottom-0  rounded-t-[40px] shadow-[0_3px_40px_-15px_rgba(0,0,0,0.3)] bg-white z-50">
            <div className=" flex-col mt-4 mb-2">
                <img className="mx-5 p-1 rounded-full border-solid border-2 border-Darkgreen" src={HomeIcon} alt="" />
                <span className="text-xs mx-3 font-bold text-Darkgreen">الرئيسيه</span>
            </div>
            <img className="m-5 my-4 p-1" src={OutlineLikeIcon} alt="" />
            <img className="m-5 my-4 p-1" src={outlinePostsIcon} alt="" />
            <img className="m-5 my-4 p-1" src={OutlineSearchIcon} alt="" />
            <img className="m-5 my-4 p-1" src={OutlineReservationIcon} alt="" />
        </div>
    </div>

  )
}

export default NavBarIconsMobile