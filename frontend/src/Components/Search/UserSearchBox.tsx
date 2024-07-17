import React from 'react';

interface UserInTeamBoxProps {
  userid: number;
  username: string;
  name: string;
  avatar: string | null;
  haseRemovebtn: boolean;
  onRemove?: () => void; // Optional remove handler
}

const UserSearchBox: React.FC<UserInTeamBoxProps> = ({
  userid,
  username,
  name,
  avatar,
  haseRemovebtn,
  onRemove,
}) => {
  return (
    <div className="flex items-center justify-between w-full">
        <div className='flex gap-2'>
            {avatar && <img src={`data:image/jpeg;base64,${avatar}`} alt={name} 
            className="w-8 h-8 rounded-full mr-2 object-cover" />}
            <div className="flex flex-col justify-around ">
                <div className="text-xs text-gray-500">{username}</div>
                <div className="text-xs ">{name}</div>
            </div>            
        </div>

      {onRemove && haseRemovebtn && (
        <button
          onClick={onRemove}
          className="bg-Darkgreen text-sm text-white px-3 py-1 rounded-full hover:bg-lightGreen mx-2"
        >
          إزالة
        </button>
      )}
    </div>
  );
};

export default UserSearchBox;
