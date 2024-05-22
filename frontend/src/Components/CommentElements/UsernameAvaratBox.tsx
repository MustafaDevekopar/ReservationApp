import React from 'react'
import { Link } from 'react-router-dom';

type Props = {
  avatarSrc: Text;
  username: String;
  fieldId: Number;
}

const UsernameAvaratBox = ({avatarSrc, username, fieldId}: Props) => {
  return (
    <div className="flex items-center my-2 gap-1">
      <Link to={`./../../profile/${fieldId}`}>
    <img
        src={
          avatarSrc === null
          ? "https://th.bing.com/th/id/OIP.znI0FjRzJgpcvCsAFpzq4QHaE7?w=268&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          : `data:image/png;base64,${avatarSrc}`
        } 
      className="w-9 h-9 rounded-full"
      alt=""
    /></Link>
    <span className="text-LightGray text-sm font-bold">{username}</span>
  </div>
  )
}

export default UsernameAvaratBox