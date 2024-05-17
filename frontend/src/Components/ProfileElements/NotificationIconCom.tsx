import {NotificationIcon } from "../IconsComponent/IconComponent"

type Props = {}

const NotificationIconCom = (props: Props) => {
  return (
    <div>
        <span className="flex relative">
            <span className="absolute left-4 bottom-2 px-1 my-1 content-center rounded-full text-xs text-white bg-red-600 ">1</span>
            <NotificationIcon />
        </span>
    </div>
  )
}

export default NotificationIconCom