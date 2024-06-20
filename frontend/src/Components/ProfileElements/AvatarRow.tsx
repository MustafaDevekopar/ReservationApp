import React from 'react'
import { Link } from 'react-router-dom'
import { DefaultAvatar } from '../../assets/Image';

type Props = {
  name: string;
  avatar: Text;
  postNumber: Number;
  follwers: Number;
  follwed: Number; 
}

const AvatarRow: React.FC<Props> = ({
  name,
  avatar,
  postNumber,
  follwers,
  follwed,
}: Props): JSX.Element => {
  return (
    <div className="flex justify-between mb-8">
        <div className="flex-none w-32  flex flex-col items-center ">
            <img className="rounded-full w-14 h-14 object-cover" 
            src={
              avatar === null
              ? DefaultAvatar
              : `data:image/png;base64,${avatar}`
            } 
            alt="" />
            <span className='text-center text-xs text-LightGray'>{name}</span>
        </div>

          <div className="flex-1 flex justify-around items-center">
            <div className="flex flex-col items-center text-xs text-LightGray">
                <span>{String(postNumber)}</span>
                <span>منشورات</span>
            </div>
            <div >
              <Link to={'/users'} className="flex flex-col items-center text-xs text-LightGray">
                <span>{String(follwers)}</span>
                <span>متابعين</span>
              </Link>
            </div>
            <div >
             <Link to={'/users'} className="flex flex-col items-center text-xs text-LightGray">
                <span>{String(follwed)}</span>
                <span>متابع</span>
              </Link>
            </div>
          </div>
    </div>
  )
}

export default AvatarRow