
import LinkToButton from "../Components/Buttons/LinkToButton"
import DesecriptionShowPost from "../Components/CommentElements/DesecriptionShowPost"
import AvatarRow from "../Components/ProfileElements/AvatarRow"
import NavIconsProfile from "../Components/ProfileElements/NavIconsProfile"
import { Link, useParams } from 'react-router-dom';
import { PostsOfFieldGet, UserGetById} from "../Api"
import { useEffect, useState } from "react";
import {  Post, UserDataType} from "../Reservations";
import { useAuth } from "../Context/useAuth";
import CardTeamList from "../Components/Lists/CardTeamList";
import FullPageLoader from "../Components/FullPageLoader/FullPageLoader";



type Props = {}

const UserProfilePage: React.FC<Props> = (props: Props): JSX.Element => {

  const {isLoggedIn, user, logout} = useAuth();

  const { userId } = useParams<{ userId?: string }>(); 
  const [UserData, setUserData] = useState<UserDataType | null>(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) return; 
        const data = await UserGetById(parseInt(userId)); // Convert id to number
        setUserData(data); // Update state with the fetched data
      } catch (error) {
        console.error('Error fetching football field data:', error);
      }
    };

    fetchData(); 
  }, [userId]); 

  if (!UserData) {
    return <FullPageLoader /> 
  }
  const isMyAccount: boolean = isLoggedIn() &&  user?.userName === UserData?.userName ;
  return (
    <div className="">
        <div className=" mt-2 mx-3 sm:mx-6  md:mx-6 lg:mx-60 xl:mx-60 mb-12">
            <NavIconsProfile 
              username={UserData.userName}
              fieldId={userId}
              isFootbalField={false}
              isMyProfile={isMyAccount}
            />
            
            <AvatarRow 
              name={UserData.userGet.name}
              avatar={UserData.userGet.avatar}
              postNumber={23}
              follwers={25}
              follwed={23}
            />
            <DesecriptionShowPost text={UserData.userGet.biography} />

            <div className="mt-10 flex gap-2">
                <LinkToButton
                  text=" الحجوزات"
                  bgColor="Darkgreen"
                  textColor="white"
                  textSize="sm"
                  width="auto"
                  paddingx="4"
                  paddingy="2"
                  path={`/reserve/${userId}`}
                />
                {isMyAccount &&
                <LinkToButton
                  text="تعديل الملف الشخصي"
                  bgColor="Darkgreen"
                  textColor="white"
                  textSize="sm"
                  width="auto"
                  paddingx="4"
                  paddingy="2"
                  path={`/profile/update/${userId}`}
                />}
            </div>
            <h2 className='my-4 '>الفرق المنتمي لها</h2>
            {userId && <CardTeamList teamId={userId} />}
            
            {/* <CardTeam Id={1} Name="فريق النسور" Avatar={null}/> */}
            {/* <UserInTeamList id="1" /> */}
 

    </div>
    </div>

  )
}

export default UserProfilePage
