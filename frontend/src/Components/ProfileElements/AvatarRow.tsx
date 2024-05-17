import React from 'react'

type Props = {}

const AvatarRow: React.FC<Props> = (props: Props): JSX.Element => {
  return (
    <div className="flex justify-between mb-8">
        <div className="flex-none w-32  flex flex-col items-center ">
            <img className="rounded-full w-14 h-14 mr-" src="https://th.bing.com/th/id/OIP.wRtvON_8JKRQghdROw5QvQHaHa?rs=1&pid=ImgDetMain" alt="" />
            <span className='text-center text-xs text-LightGray'>ملعب سباعي الرمادي</span>
        </div>

          <div className="flex-1 flex justify-around items-center">
            <div className="flex flex-col items-center text-xs text-LightGray">
                <span>32</span>
                <span>منشورات</span>
            </div>
            <div className="flex flex-col items-center text-xs text-LightGray">
                <span>32</span>
                <span>منشورات</span>
            </div>
            <div className="flex flex-col items-center text-xs text-LightGray">
                <span>32</span>
                <span>منشورات</span>
            </div>
          </div>
    </div>
  )
}

export default AvatarRow