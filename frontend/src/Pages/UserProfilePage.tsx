
import LinkToButton from "../Components/Buttons/LinkToButton"
import DesecriptionShowPost from "../Components/CommentElements/DesecriptionShowPost"
import AvatarRow from "../Components/ProfileElements/AvatarRow"
import NavIconsProfile from "../Components/ProfileElements/NavIconsProfile"
import { Link, useParams } from 'react-router-dom';
import { PostsOfFieldGet, UserGetById} from "../Api"
import { useEffect, useState } from "react";
import { FootballFaild, Post, UserDataType, UserProfiletype } from "../Reservations";



type Props = {}

const UserProfilePage: React.FC<Props> = (props: Props): JSX.Element => {

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

  const [post, setPost] = useState<Post[]>([]); 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (!userId) return; 
        const postData = await PostsOfFieldGet(parseInt(userId)); 
        setPost(postData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchPosts();
  }, []);

  if (!UserData) {
    return <div>Loading.post..</div>; // Add loading indicator while fetching data
    
  }

  return (
    <div className="">
        <div className=" mt-2 mx-3 sm:mx-6  md:mx-6 lg:mx-60 xl:mx-60 mb-12">

            <NavIconsProfile 
              username={UserData.userName}
              fieldId={userId}
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
                <LinkToButton
                  text="تعديل الملف الشخصي"
                  bgColor="Darkgreen"
                  textColor="white"
                  textSize="sm"
                  width="auto"
                  paddingx="4"
                  paddingy="2"
                  path={`/profile/update/${userId}`}
                />
            </div>
 

    </div>
    </div>

  )
}

export default UserProfilePage
