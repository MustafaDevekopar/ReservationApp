
import React, { useEffect, useState } from "react";
import { UpdatesData } from "./UpdatesData";
import { AdminsGet } from "../../AdminApi";
import { User } from "../../AdminType";
import { DefaultAvatar } from "../../../assets/Image";
import { useAuth } from "../../../Context/useAuth";

interface Update {
  img: string;
  name: string;
  noti: string;
  time: string;
}

const Updates: React.FC = () => {
  const [userData, setUserData] = useState<User[]>([]); 
  const {isLoggedIn, user, logout} = useAuth();
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await AdminsGet(); 
        setUserData(data); 
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers(); 
  }, []);
  
  return (
    <div className="Updatesxb sm:w-full md:w-full lg:w-[95%] xl:w-[95%] bg-white rounded-xl p-4 gap-4 flex flex-col text-sm  ">
      {userData.map((row ) => {
        return (
          <div className={`${user?.userName === row.userName ? "border-2 border-Darkgreen p-2 rounded-xl": ""} flex gap-2`} key={row.userGet.id}>
            {/* <img src={update.img} alt="profile" className="w-12 h-12" /> */}
            <div className="flex flex-col justify-center items-center">
                        <img 
                            src={
                                row.userGet.avatar === null
                                ? DefaultAvatar
                                : `data:image/png;base64,${row.userGet.avatar}`
                            }
                            alt="صورة" className="object-cover w-12 min-w-12 h-12 rounded-full" 
                        />  
                        <span className="text-xs font-buld">{row.userName}</span>  
                    </div>  
            <div className="noti">
              <div style={{ marginBottom: "0.5rem" }}>
                <span className="font-bold">{row.userGet.name}</span>
                {/* <span> {row.accountType}</span> */}
                <span> {row.userGet.biography}</span>
                <span> {row.phoneNumber}</span>
              </div>
              {/* <span>{update.time}</span> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Updates;
