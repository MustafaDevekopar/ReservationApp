import HomeIcon from "./../../Assets/Icons/HomeIcon.svg"
import OutlineLikeIcon from "./../../Assets/Icons/outlineLikeIcon.svg"
import OutlineSearchIcon from "./../../Assets/Icons/OutlineSearchIcon.svg"
import OutlineReservationIcon from "./../../Assets/Icons/OutlineReservationIcon.svg"
import outlinePostsIcon from "./../../Assets/Icons/outlinePostsIcon.svg"
import { Link } from "react-router-dom"

type Props = {}

const NavBarIcons = (props: Props) => {
  return (
    <div className="flex-col relative top-20 hidden lg:block xl:block">
      <div className="absolute top-14 right-0 rounded-l-[40px] h-auto shadow-[0_3px_40px_-15px_rgba(0,0,0,0.3)] w">
            <div className=" flex-col my-8">
              <Link to="/">
              <img className="mx-5 p-1 rounded-full border-solid border-2 border-Darkgreen " src={HomeIcon} alt="" />
              </Link>
              <span className="text-xs mx-3 font-bold text-Darkgreen">الرئيسيه</span>
            </div>

          <Link to="/favorite"><img className="m-5 my-8 p-1" src={OutlineLikeIcon} alt="" /></Link> 
          <Link to="/"><img className="m-5 my-8 p-1" src={outlinePostsIcon} alt="" /></Link> 
          <Link to="search"><img className="m-5 my-8 p-1" src={OutlineSearchIcon} alt="" /></Link>
          <Link to="/"><img className="m-5 my-8 p-1" src={OutlineReservationIcon} alt="" /></Link>
      </div>
    </div>
  )
}

export default NavBarIcons