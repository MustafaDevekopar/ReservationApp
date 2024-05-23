
import { DefaultAvatar } from "../../assets/Image";
import { LikeIcon } from "../IconsComponent/IconComponent";


interface CommentBoxProps {
    commentTitle: string;
    commentUsername: string;
    commentName: string;
    commentAvatar: string | null;
  }
  
  const CommentBox = ({ commentTitle, commentUsername, commentName, commentAvatar }: CommentBoxProps) => {
    return (
 
   <div className=" p-4 rounded-lg flex gap-2">
        <img src={ commentAvatar === null ? DefaultAvatar : `data:image/png;base64,${commentAvatar}`}
            alt="img" className="w-8 min-w-8 h-8 mb-2 rounded-full" />
        <div className="flex flex-col flex-1 gap-2 ">
            <span className="text-LightGray font-bold text-xs ">{commentUsername }</span>
            <span className="text-LightGray text-[10px]">{commentTitle}</span>
        </div>
        <div className="flex flex-col item-center justify-center gap-2 ">
            <LikeIcon className="w-4"/>
            <span className="text-[8px] text-center">123</span>
        </div>
  </div>
    );
  };
  
  export default CommentBox;
  