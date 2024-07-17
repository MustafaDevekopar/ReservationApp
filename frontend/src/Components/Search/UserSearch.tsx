
import React, { useEffect, useState } from 'react';
import UserInTeamBox from '../TeamElements/UserInTeamBox';
import { Icon } from '@iconify-icon/react';
import { useParams } from 'react-router-dom';
import { UsersSearchEndPoint } from '../../Api';
import { User } from '../../Reservations';
import FullPageLoader from '../FullPageLoader/FullPageLoader';
import UserSearchBox from './UserSearchBox';



interface UserSearchProps {
  onUserSelect: (user: User) => void;
}

const UserSearch: React.FC<UserSearchProps> = ({ onUserSelect }) => {

  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState<User[]>([]);
  const { userId } = useParams<{ userId?: string }>();
  const [loading, setLoading] = useState<boolean>(false);

  const searchUsers = async () => {
    if (!keyword.trim() || !userId) return;
    try {
      setLoading(true)
      const data = await UsersSearchEndPoint(keyword, Number(userId));
      setResults(data);
    } catch (error) {
      console.error('Error searching users:', error);
    }finally{
      setLoading(false);
    }
  };
  // ==== if i need to search on input change
  // useEffect(() => {
  //   if (keyword ) {
  //     searchUsers();
  //   }
  // }, [keyword, userId]);

  return (
    <div className='max-w-md min-w-2xl mx-auto mt-6'>
      {loading &&  <FullPageLoader />} 
      <label className="block text-gray-700 text-sm mb-2">ابحث عن مستخدمين</label>
      <div className="flex mb-2 gap-2">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="ابحث عن مستخدمين..."
          className="shadow appearance-none border-2 border-LightXlGray rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-Darkgreen"
        />
        <button 
          onClick={searchUsers}
          className="bg-Darkgreen text-white p-2 rounded-lg hover:bg-lightGreen flex items-center">
          بحث
          <Icon icon="heroicons-solid:search" />
        </button>
      </div>
      <ul className="border border-gray-300 rounded-lg">
        {results.map((user) => (
          <li 
            key={user.id} 
            onClick={() => onUserSelect(user)}
            className="p-2 border-b last:border-b-0 border-gray-200 cursor-pointer hover:bg-gray-100"
          >
            <UserSearchBox
              userid={user.id}
              username={user.username}
              name={user.name}
              avatar={user.avatar}
              haseRemovebtn={false}
              onRemove={() => {}}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSearch;
