
import LinkToButton from "../Components/Buttons/LinkToButton"
import DesecriptionShowPost from "../Components/CommentElements/DesecriptionShowPost"
import AvatarRow from "../Components/ProfileElements/AvatarRow"
import NavIconsProfile from "../Components/ProfileElements/NavIconsProfile"
import { Link, useParams } from 'react-router-dom';
import {FootbalfieldsGetById, PostsOfFieldGet} from "../Api"
import { useEffect, useState } from "react";
import { FootballFaild, Post } from "../Reservations";



type Props = {}

const ProfilePage: React.FC<Props> = (props: Props): JSX.Element => {
  const { fieldId } = useParams<{ fieldId?: string }>(); 
  const [fieldData, setFieldData] = useState<FootballFaild | null>(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!fieldId) return; 

        const data = await FootbalfieldsGetById(parseInt(fieldId)); // Convert id to number
        setFieldData(data); // Update state with the fetched data
      } catch (error) {
        console.error('Error fetching football field data:', error);
      }
    };

    fetchData(); 
  }, [fieldId]); 

  const [post, setPost] = useState<Post[]>([]); 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (!fieldId) return; 
        const postData = await PostsOfFieldGet(parseInt(fieldId)); 
        setPost(postData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchPosts();
  }, []);

  if (!fieldData) {
    return <div>Loading.post..</div>; // Add loading indicator while fetching data
    
  }

  return (
    <div className="">
        <div className=" mt-2 mx-3 sm:mx-6  md:mx-6 lg:mx-60 xl:mx-60 mb-12">

            <NavIconsProfile 
              username={fieldData.username}
              fieldId={fieldId}
            />
            <AvatarRow 
              name={fieldData.name}
              avatar={fieldData.avatar}
              postNumber={23}
              follwers={25}
              follwed={23}
            />
            <DesecriptionShowPost text="يمكنك اضافة نص كوصف للصفحة يمكنك اضافة نص كوصف للصفحة يمكنك اضافة نص كوصف للصفحة " />

            <div className="mt-10 flex gap-2">
                <LinkToButton
                  text=" الحجوزات"
                  bgColor="Darkgreen"
                  textColor="white"
                  textSize="sm"
                  width="auto"
                  paddingx="4"
                  paddingy="2"
                  path={`/reserve/${fieldId}`}
                />
                <LinkToButton
                  text="تعديل الملف الشخصي"
                  bgColor="Darkgreen"
                  textColor="white"
                  textSize="sm"
                  width="auto"
                  paddingx="4"
                  paddingy="2"
                  path="/reserve"
                />
                {/* <OutlineButton
                  text="مشاركه"
                  textSize="sm"
                  textColor="text-Darkgreen"
                  outlinColor="outline-Darkgreen"
                  paddingx="3"
                  paddingy="2"
                  marginx="1"
                  hasIcon={true}
                  icon=""
                /> */}
            </div>
 


    <div className="flex flex-wrap   mt-6 mb-20">
      {post.map((post) => (
        <div key={post.id} className="w-1/3 p-[1px] lg:p-1 lg:w-1/4 xl:w-1/4">
          <Link to={`/showpost`} className="rounded-md overflow-hidden">
            <div className="relative">
               <img 
                src={
                  post.image === null
                  ? "https://th.bing.com/th/id/OIP.znI0FjRzJgpcvCsAFpzq4QHaE7?w=268&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
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

export default ProfilePage