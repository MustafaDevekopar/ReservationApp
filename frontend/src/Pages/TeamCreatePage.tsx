
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import UserSearchBox from '../Components/Search/UserSearchBox';
import UserSearch from '../Components/Search/UserSearch';
import { CreateTeam } from '../Api';
import { toast } from 'react-toastify';
import { User } from '../Reservations';


const TeamCreatePage: React.FC = () => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useParams<{ userId?: string }>();

  const handleUserSelect = (user: User) => {
    if (!selectedUsers.some((selectedUser) => selectedUser.id === user.id)) {
      setSelectedUsers((prevUsers) => [...prevUsers, user]);
    }
  };

  const handleUserRemove = (userId: number) => {
    setSelectedUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  const handleSubmit = async () => {
    setError(null); // Reset error state

    const userIds = selectedUsers.map((user) => user.id);

    try {
       const responce = await CreateTeam({ name, teamLeaderId: userId!, avatar, userIds });
      if(responce == true){
        toast.success("تم انشاء الفريق بنجاح");       
      }else{
        toast.error("فشل !! تأكد من حصة المعلومات");
        console.log("responce: ", responce.data);
      }
    } catch (error: any) {
      console.log("Ex error ", error)
    }
  };

  return (
    <div className="max-w-md min-w-2xl mx-auto py-12 px-6">
      <h2 className="mb-8 text-center">انشاء فريق</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm mb-2">اسم الفريق</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="اسم الفريق"
          className="shadow appearance-none border-2 border-LightXlGray rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-Darkgreen"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm mb-2">اختر صورة</label>
        <input
          type="file"
          onChange={(e) => setAvatar(e.target.files?.[0] || null)}
          className="shadow appearance-none border-2 border-LightXlGray rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-Darkgreen"
        />
      </div>
      <UserSearch onUserSelect={handleUserSelect} />
      <ul className="mt-4">
        {selectedUsers.map((user) => (
          <li key={user.id} className="p-2 border-b border-gray-200 flex justify-between items-center">
            <UserSearchBox
              userid={user.id}
              username={user.username}
              name={user.name}
              avatar={user.avatar}
              haseRemovebtn={true}
              onRemove={() => handleUserRemove(user.id)}
            />
          </li>
        ))}
      </ul>
      <button
        onClick={handleSubmit}
        className="mt-4 w-full bg-Darkgreen text-white p-2 rounded-lg hover:bg-lightGreen"
      >
        انشاء فريق
      </button>
    </div>
  );
};

export default TeamCreatePage;
