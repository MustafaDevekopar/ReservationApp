
import UsernameAvaratBox from "../CommentElements/UsernameAvaratBox";
import ImageOfShowPost from "../CommentElements/ImageOfShowPost";
import IconsOfShowPost from "../CommentElements/IconsOfShowPost";
import DesecriptionShowPost from "../CommentElements/DesecriptionShowPost";

type Props = {}

const ShowOnePost = (props: Props) => {

  return (
    <div className="mb-20 mt-4">
        <UsernameAvaratBox />
        <ImageOfShowPost />
  
        <IconsOfShowPost />
        <DesecriptionShowPost />
       
    </div>
  )
}

export default ShowOnePost