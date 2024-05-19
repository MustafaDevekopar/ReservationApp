
import UsernameAvaratBox from "../CommentElements/UsernameAvaratBox";
import ImageOfShowPost from "../CommentElements/ImageOfShowPost";
import IconsOfShowPost from "../CommentElements/IconsOfShowPost";
import DesecriptionShowPost from "../CommentElements/DesecriptionShowPost";

type Props = {}

const ShowOnePost: React.FC<Props> = (props: Props):JSX.Element => {

  return (
    <div className="mb-20 mt-4">
        {/* <UsernameAvaratBox avatarSrc={"dsdfsdf"}/>
        <ImageOfShowPost imageSrc={"sss/ss"}/>
  
        <IconsOfShowPost />
        <DesecriptionShowPost text={"Add text dynamc"} /> */}
       
    </div>
  )
}

export default ShowOnePost