
import NotificationBell from "../NotificationElements/NotificationBell"

type Props = {
  userid: number;
}

const NotificationIconCom: React.FC<Props> = ({userid}: Props): JSX.Element => {
  return (
    <div>
       <NotificationBell userId={userid} />
    </div>
  )
}

export default NotificationIconCom