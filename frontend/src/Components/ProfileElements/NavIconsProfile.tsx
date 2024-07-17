
import { Link, useParams } from 'react-router-dom';
import { NavigationIcon, NewPostIcon } from '../IconsComponent/IconComponent'
import NotificationIconCom from './NotificationIconCom'

type Props = {
  username: String;
  fieldId: String | undefined;
  isFootbalField:boolean;
  isMyProfile: boolean;
}

const NavIconsProfile: React.FC<Props> = ({username, fieldId, isFootbalField, isMyProfile}: Props): JSX.Element => {
  const { userId } = useParams<{ userId?: string }>(); 
  return (
    <div className="flex h-16">
        <div className="flex-non flex justify-center items-end w-32">
            <span className="text-sm text-DarkGray text-center font-bold">{username}</span>
        </div>
        {isMyProfile &&
          <div className="flex-1 flex  gap-6 items-center justify-end">
            {
              userId && <NotificationIconCom userid={parseInt(userId)}/>
            }
               
              {isFootbalField && 
                <Link to={`../addpost/${fieldId}`}>
                  <NewPostIcon className="w-7"/>
                </Link>
              }
              <Link to={`/setting/${userId}`}>
                <NavigationIcon className="w-7"/>
              </Link>
          </div>
        }
    </div>
  )
}

export default NavIconsProfile