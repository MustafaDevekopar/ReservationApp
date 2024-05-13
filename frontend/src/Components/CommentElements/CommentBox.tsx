// import LikeIcon from "./../../Assets/Icons/LikeIcon.svg"
const LikeIcon: string = require("../../assets/Icons/LikeIcon.svg").default;



type commentProps = {
    imageUrl: string;
    commentTitle: string;
    commentUsername: string;
}

const CommentBox = ({
    imageUrl,
    commentTitle,
    commentUsername
}: commentProps) => {
  return (
    <div className=" p-4 rounded-lg flex gap-2">
        <img src={imageUrl} alt="img" className="w-8 min-w-8 h-8 mb-2 rounded-full" />
        <div className="flex flex-col flex-1 gap-2 ">
            <span className="text-LightGray font-bold text-xs ">{commentUsername}</span>
            <span className="text-LightGray text-[10px]">{commentTitle}</span>
        </div>
        <div className="flex flex-col item-center justify-center gap-2 ">
            <img className="w-4 min-w-4" src={LikeIcon} alt="" />
            <span className="text-[8px] text-center">123</span>
        </div>
  </div>
  )
}

export default CommentBox