import React from 'react'

type Props = {}

const UsernameAvaratBox = (props: Props) => {
  return (
    <div className="flex items-center my-2 gap-1 ">
    <img
      src="https://th.bing.com/th/id/OIP.qChHVnS-8mJszMpvT8vlFwHaDj?w=1200&h=575&rs=1&pid=ImgDetMain"
      className="w-9 h-9 rounded-full"
      alt=""
    />
    <span className="text-LightGray text-sm font-bold">n1u_u</span>
  </div>
  )
}

export default UsernameAvaratBox