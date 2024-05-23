
import { Link } from 'react-router-dom';
import { NavigationIcon, NewPostIcon } from '../IconsComponent/IconComponent'
import NotificationIconCom from './NotificationIconCom'

type Props = {
  username: String;
  fieldId: String | undefined;
}

const NavIconsProfile: React.FC<Props> = ({username, fieldId}: Props): JSX.Element => {
  return (
    <div className="flex h-16">
        <div className="flex-non flex justify-center items-end w-32">
            <span className="text-sm text-DarkGray text-center font-bold">{username}</span>
        </div>
        <div className="flex-1 flex  gap-6 items-center justify-end">
            <NotificationIconCom />
            <Link to={`../addpost/${fieldId}`}>
              <NewPostIcon className="w-7"/>
            </Link>
            <NavigationIcon className="w-7"/>
        </div>

    </div>
  )
}

export default NavIconsProfile