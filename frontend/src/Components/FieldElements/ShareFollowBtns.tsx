
import OutlineButton from '../Buttons/OutlineButton'
import { ShareIcon } from '../IconsComponent/IconComponent'

type Props = {}

const ShareFollowBtns = (props: Props) => {
  return (
    <div className="w-full ">
    <OutlineButton 
        text="مشاركه"
        textSize='sm'
        color='OutlineBlue'
        paddingx='3'
        paddingy='1'
        marginx='1'
        hasIcon={true}
        icon={<ShareIcon />}
    />
    <OutlineButton 
        text="متابعه"
        textSize='sm'
        color='OutlineBlue'
        paddingx='3'
        paddingy='1'
        marginx='1'
        hasIcon={false}
        icon="none"
    />
 </div>
  )
}

export default ShareFollowBtns