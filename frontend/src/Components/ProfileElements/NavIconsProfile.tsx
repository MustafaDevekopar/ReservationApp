
import { NavigationIcon, NewPostIcon } from '../IconsComponent/IconComponent'
import NotificationIconCom from './NotificationIconCom'

type Props = {}

const NavIconsProfile: React.FC<Props> = (props: Props): JSX.Element => {
  return (
    <div className="flex h-16">
        <div className="flex-non flex justify-center items-end w-32">
            <span className="text-sm text-DarkGray text-center font-bold">n1u_u</span>
        </div>
        <div className="flex-1 flex  gap-6 items-center justify-end">
            <NotificationIconCom />
            <NewPostIcon className="w-7"/>
            <NavigationIcon className="w-7"/>
        </div>

    </div>
  )
}

export default NavIconsProfile