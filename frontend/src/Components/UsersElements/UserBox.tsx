import LinkToButton from "../Buttons/LinkToButton";

// import LikeIcon from "./../../Assets/Icons/LikeIcon.svg"
const LikeIcon: string = require("../../assets/Icons/LikeIcon.svg").default;



type commentProps = {
    imageUrl: string;
    name: string;
    username: string;
}

const UserBox = ({
    imageUrl,
    name,
    username
}: commentProps) => {
  return (
    <div className=" p-4 rounded-lg flex gap-2">
           <img
            src={
                imageUrl === null
                ? "https://th.bing.com/th/id/OIP.b9O2idje2TWERYUincVvCgHaHa?pid=ImgDet&w=182&h=182&c=7&dpr=1.3"
                : `data:image/png;base64,${imageUrl}`
            }
            alt="img"
            className="w-8 min-w-8 h-8 mb-2 rounded-full object-cover"
            />
        <div className="flex flex-col flex-1 gap-2 ">
            <span className="text-LightGray font-bold text-xs ">{username}</span>
            <span className="text-LightGray text-[10px]">{name}</span>
        </div>
        <div className="flex flex-col item-center justify-center gap-2 ">
        <LinkToButton
                text="ازالة"
                bgColor="Darkgreen"
                textColor="white"
                textSize="xs"
                width="auto"
                paddingx="4"
                paddingy="0"
                path="/reserve"
            />
        </div>
  </div>
  )
}

export default UserBox