import React from 'react'

type Props = {
  avatarSrc: Text;
}

const UsernameAvaratBox = ({avatarSrc}: Props) => {
  return (
    <div className="flex items-center my-2 gap-1 ">
    <img
        src={
          avatarSrc === null
          ? "https://th.bing.com/th/id/OIP.znI0FjRzJgpcvCsAFpzq4QHaE7?w=268&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          : `data:image/png;base64,${avatarSrc}`
        }
      className="w-9 h-9 rounded-full"
      alt=""
    />
    <span className="text-LightGray text-sm font-bold">n1u_u</span>
  </div>
  )
}

export default UsernameAvaratBox