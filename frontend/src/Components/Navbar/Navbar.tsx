import { Link } from "react-router-dom";
import Search from "../Search/Search";
import { useAuth } from "../../Context/useAuth";
const notificationIcon: string  = require( "./../../assets/Icons/notificationIcon.svg").default;


type Props = {}

const Navbar: React.FC<Props> = (props: Props):JSX.Element => {
  const {isLoggedIn, user, logout} = useAuth();
  return (
    <div className=" flex justify-evenly items-center h-20 w-full shadow-md bg-white">
        {/* <Link to={"/profile"}>
           <img className="rounded-full w-12 h-12" src="https://th.bing.com/th/id/OIP.wRtvON_8JKRQghdROw5QvQHaHa?rs=1&pid=ImgDetMain" alt="" />
        </Link> */}
        {isLoggedIn() 
          ? ( 
            <div className="flex flex-col text-xs">
              <span className="">{user?.userName}</span>
              <a onClick={logout} className="bg-Darkgreen text-white p-1 rounded-md">تسجيل خروج</a>            
            </div>
  
          ) : (
            <Link to={'/login'}>تسجيل دخول</Link>
          )}
       
        {/* <input className="w-56 h-7 outline outline-2 outline-offset-2 outline-LightXlGray  rounded-md" type="text" /> */}
        <Search />
        <span className="flex relative">
            <span className="absolute left-4 bottom-2 px-1 my-1 content-center rounded-full text-xs text-white bg-red-600 ">1</span>
            <img src={notificationIcon} alt="" />
        </span>
    </div>
  )
}

export default Navbar