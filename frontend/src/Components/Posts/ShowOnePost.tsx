

import { Link } from "react-router-dom";
import LikePost from "./../../Assets/Icons/LikePostIcon.svg";
import CommentIcon from "./../../Assets/Icons/CommentIcon.svg";
import { useState } from "react";

type Props = {}

const ShowOnePost = (props: Props) => {
    const [showFullText, setShowFullText] = useState(false);

    const handleToggleText = () => {
      setShowFullText(!showFullText);
    };
  return (
    <div className="mb-20 mt-4">
        
        <div className="flex items-center my-2 gap-1 ">
        <img
          src="https://th.bing.com/th/id/OIP.qChHVnS-8mJszMpvT8vlFwHaDj?w=1200&h=575&rs=1&pid=ImgDetMain"
          className="w-9 h-9 rounded-full"
          alt=""
        />
        <span className="text-LightGray text-sm font-bold">n1u_u</span>
      </div>
      <div>
        <img
          src="https://th.bing.com/th/id/OIP.qChHVnS-8mJszMpvT8vlFwHaDj?w=1200&h=575&rs=1&pid=ImgDetMain"
          alt=""
        />
      </div>
      <div className="mx-5 my-4">
        <div className="flex flex-col gap-1">
            <div className="flex gap-4">
                <img src={LikePost} alt="" className="w-6 h-7" />
                <Link to="/comments">
                    <img src={CommentIcon} alt="" className="w-7 h-7" />
                </Link>
                
            </div>  
            <div className="text-[11px] text-LightXlGray">129 تسجيل اعجاب</div>   
        </div>


        <div className="flex gap-2">
          <span className="text-LightGray text-xs font-bold">n1u_u</span>
          <div className=" flex text-xs">
            <span
                className={` ${
                showFullText ? "line-clamp-none" : "line-clamp-1"
                }`}
                onClick={handleToggleText}
            >
                سارع في الحجز في ملعب سباعي الرمادي سارع في الحجز في ملعب سباعي
                الرمادي
                سارع في الحجز في ملعب سباعي الرمادي سارع في الحجز في ملعب سباعي
                الرمادي
            </span>
            <span onClick={handleToggleText} className="ml-12 text-LightXlGray">{!showFullText && "المزيد"}</span>
          </div>

        </div>
      </div>
       
    </div>
  )
}

export default ShowOnePost