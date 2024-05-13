
import { Link } from "react-router-dom"
import {CommentIcon, LikePost} from "./../IconsComponent/IconComponent"

type Props = {}

const IconsOfShowPost = (props: Props) => {
  return (
    
    <div className="flex flex-col gap-1 mt-5 mx-4">
        <div className="flex gap-4">
            <LikePost className="w-6 h-7"/>
            <Link to="/comments">
                <CommentIcon className="w-7 h-7"/>
            </Link>               
        </div>  
        <div className="text-[11px] text-LightXlGray">129 تسجيل اعجاب</div>   
    </div>
  )
}

export default IconsOfShowPost