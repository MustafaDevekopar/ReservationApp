import { Link } from "react-router-dom";
import Search from "../Search/Search";
import { useAuth } from "../../Context/useAuth";
import { DefaultAvatar } from "../../assets/Image";
import { Icon } from "@iconify-icon/react";
import { UserDataType } from "../../Reservations";
import { useEffect, useState } from "react";
import { UserOrFieldGetByUsername } from "../../Api";
const notificationIcon: string  = require( "./../../assets/Icons/notificationIcon.svg").default;


type Props = {}

const Navbar: React.FC<Props> = (props: Props):JSX.Element => {
  const {isLoggedIn, user, logout} = useAuth();
  const [UserData, setUserData] = useState<UserDataType | null>(null); 
 const username = user?.userName;
 const isFieldOwner: boolean = user?.accountType ==="FieldOwner";
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!username) return; 

        const data = await UserOrFieldGetByUsername(username,isFieldOwner); // Convert id to number
        console.log(data.id);
        setUserData(data); // Update state with the fetched data
      } catch (error) {
        console.error('Error fetching football field data:', error);
      }
    };

    fetchData(); 
  }, [username]); 

  return (
    <div className=" flex justify-evenly items-center h-12 w-full shadow-md bg-white">

        {isLoggedIn() 
          ? ( 
            <div className="flex items-center">
              <div className="flex text-xs">
                <Link to={`${user?.accountType == "FieldOwner" ? `fieldprofile/${UserData?.userGet.id}`: `/userprofile/${UserData?.userGet.id}`}`}>
                  <img className="rounded-full w-8 h-8 object-cover" 

                  src={ UserData?.userGet.avatar == null
                    ? DefaultAvatar 
                    : `data:image/png;base64,${UserData.userGet.avatar}`
                    } alt="" />
                </Link>
                {/* <span className="">{user?.userName}</span>
                <span className="">{user?.phonenumber}</span> */}
                <span className="" onClick={logout}>
                  <Icon icon="material-symbols:logout-rounded" className="text-2xl text-DarkGray"/>
                </span> 
              </div>
            </div>
  
          ) : (
            <Link to={'/login'}>
              <Icon icon="material-symbols:login-rounded" className="text-2xl text-DarkGray"/>
            </Link>
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