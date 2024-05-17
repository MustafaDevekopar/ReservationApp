
import LinkToButton from "../Components/Buttons/LinkToButton"
import DesecriptionShowPost from "../Components/CommentElements/DesecriptionShowPost"
import AvatarRow from "../Components/ProfileElements/AvatarRow"
import NavIconsProfile from "../Components/ProfileElements/NavIconsProfile"
import { Link } from 'react-router-dom';
import {information} from "./../Api"
import OutlineButton from "../Components/Buttons/OutlineButton";



type Props = {}

const ProfilePage = (props: Props) => {
  return (
    <div className="">
        <div className=" mt-2 mx-3 sm:mx-6  md:mx-6 lg:mx-60 xl:mx-60 mb-12">

            <NavIconsProfile />
            <AvatarRow />
            <DesecriptionShowPost />

            <div className="mt-10 flex gap-2">
                <LinkToButton
                  text=" الحجوزات"
                  bgColor="Darkgreen"
                  textColor="white"
                  textSize="sm"
                  width="auto"
                  paddingx="4"
                  paddingy="2"
                  path="/reserve"
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
 


    <div className="flex flex-wrap justify-center  mt-6 mb-20">
      {information.map((post) => (
        <div key={post.id} className="w-1/3 p-[1px] lg:p-1 lg:w-1/4 xl:w-1/4">
          <Link to={`/showpost`} className="rounded-md overflow-hidden">
            <div className="relative">
               <img src={post.imageUrl} alt={post.title} className="w-full aspect-9/16 object-cover rounded-xl overflow-hidden" />
               <span className="absolute bottom-4 right-2 text-[8px] text-white text-center line-clamp-2 ml-4"> عروض ملعب الرمادي النموذجي سارعوا الحجز قبل انتهاء</span>       
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