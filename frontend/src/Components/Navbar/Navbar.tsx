import React from 'react'
import notificationIcon from "./../../Assets/Icons/notificationIcon.svg"

type Props = {}

const Navbar = (props: Props) => {
  return (
    <div className=" flex justify-evenly items-center h-20 w-full shadow-md bg-white">
        <img className="rounded-full w-12 h-12" src="https://th.bing.com/th/id/OIP.wRtvON_8JKRQghdROw5QvQHaHa?rs=1&pid=ImgDetMain" alt="" />
        <input className="w-56 h-7 outline outline-2 outline-offset-2 outline-LightXlGray  rounded-md" type="text" />
        <span className="flex relative">
            <span className="absolute left-4 bottom-2 px-1 my-1 content-center rounded-full text-xs text-white bg-red-600 ">1</span>
            <img src={notificationIcon} alt="" />
        </span>
    </div>
  )
}

export default Navbar