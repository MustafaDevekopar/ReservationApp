import React, { useEffect, useState } from 'react';
import { UsersGet } from '../Api'; // Import UsersGet function
import { User } from '../Reservations';
import UserBox from '../Components/UsersElements/UserBox';

const UsersPage: React.FC = (): JSX.Element => {
  const [users, setUsers] = useState<User[]>([]); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await UsersGet(); // Call UsersGet function to fetch users
        setUsers(usersData); // Update state with fetched users
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers(); // Call fetchUsers function when component mounts
  }, []);

  return (
    <div className="container mx-auto py-8 pb-20">
      <h1 className="mb-4 text-md text-DarkGray text-center font-semibold">المتابعين</h1>
      <div className="flex flex-col gap-4 mx-3 sm:mx-4 md:mx-12 lg:mx-40">
        {users.map((user: User) => ( 
          <UserBox
            key={user.id}
            imageUrl={user.avatar}
            username={user.username}
            name={user.name}
          />
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
