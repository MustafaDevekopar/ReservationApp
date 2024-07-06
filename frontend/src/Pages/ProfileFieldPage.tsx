
import LinkToButton from "../Components/Buttons/LinkToButton"
import DesecriptionShowPost from "../Components/CommentElements/DesecriptionShowPost"
import AvatarRow from "../Components/ProfileElements/AvatarRow"
import NavIconsProfile from "../Components/ProfileElements/NavIconsProfile"
import { Link, useParams } from 'react-router-dom';
import {FootbalfieldsGetById, PostsOfFieldGet} from "../Api"
import { useEffect, useState } from "react";
import { FieldDataType, FootballFaild, Post } from "../Reservations";
import { DefaultPost } from "../assets/Image";
import FullPageLoader from "../Components/FullPageLoader/FullPageLoader";



type Props = {}

const ProfileFieldPage: React.FC<Props> = (props: Props): JSX.Element => {
  const { userId } = useParams<{ userId?: string }>(); 
  const [fieldData, setFieldData] = useState<FieldDataType | null>(null); 
  const [post, setPost] = useState<Post[]>([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) return; 

        const data = await FootbalfieldsGetById(parseInt(userId)); 
        setFieldData(data); 

        const postData = await PostsOfFieldGet(parseInt(userId)); 
        setPost(postData);
      } catch (error) {
        console.error('Error fetching football field data:', error);
      }
    };

    fetchData(); 
  }, [userId]); 

  if (!fieldData) {
    return <FullPageLoader />; 
  }

 

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       if (!userId) return; 
  //       const postData = await PostsOfFieldGet(parseInt(userId)); 
  //       setPost(postData);
  //     } catch (error) {
  //       console.error('Error fetching users:', error);
  //     }
  //   };

  //   fetchPosts();
  // }, []);

  // if (!fieldData) {
  //   return <div>Loading.post..</div>; // Add loading indicator while fetching data
    
  // }

  return (
    <div className="">
        <div className=" mt-2 mx-3 sm:mx-6  md:mx-6 lg:mx-60 xl:mx-60 mb-12">

            <NavIconsProfile 
              username={fieldData.userName}
              fieldId={userId}
              isFootbalField={true}
              isMyProfile={true}
            />
            <AvatarRow 
              name={fieldData.userGet.name}
              avatar={fieldData.userGet.avatar}
              postNumber={23}
              follwers={25}
              follwed={23}
            />
            <DesecriptionShowPost text={fieldData.userGet.biography} />

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
                  path={`/field-update/${userId}`}
                />
            </div>
 


    <div className="flex flex-wrap   mt-6 mb-20">
      {post.map((post) => (
        <div key={post.id} className="w-1/3 p-[1px] lg:p-1 lg:w-1/4 xl:w-1/4">
          <Link to={`/showpost`} className="rounded-md overflow-hidden">
            <div className="relative">
               <img 
                src={
                  post.image === null
                  ? DefaultPost
                  : `data:image/png;base64,${post.image}`
                }
               alt="" className="w-full aspect-9/16 object-cover rounded-xl overflow-hidden" />
               <span className="absolute bottom-4 right-2 text-[8px] text-white text-center line-clamp-2 ml-4">{post.text}</span>       
            </div>
          </Link>
        </div>
      ))}
    </div>
    </div>
    </div>

  )
}

export default ProfileFieldPage