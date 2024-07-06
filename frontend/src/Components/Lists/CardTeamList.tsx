// import { useEffect, useState } from 'react';
// import { GetAllTeamsByUserId } from '../../Api';
// import { TeamDataType } from '../../Reservations'; // Check the correct path for importing Comment type
// import CardTeam from '../Cards/CardTeam';

// interface Props {
//     teamId: string; 
// }


// const CardTeamList = ({ teamId }: Props) => {
//   const [loading, setLoading] = useState<boolean>(false);
//   const [team, setTeam] = useState<TeamDataType[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (!teamId) return;
//         setLoading(true);
//         const data = await GetAllTeamsByUserId(parseInt(teamId));
//         setTeam(data);
//       } catch (error) {
//         console.error('Error fetching comment data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [teamId]);

//   // if (team.length === 0) {
//   //   return <div className="text-DarkGray w-full flex items-center justify-center mt-[30%]">لا توجد اعضاء</div>;
//   // }

//   return (
//     <div className="grid gap-3 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2  w-full my-6">
//       {team?.map((tm, index) => (
//         <div key={index} className=''>
//           <CardTeam
//             Name={tm.name} // Corrected prop name to 'name'
//             Id={tm.id} // Corrected prop name to 'username'
//             Avatar={tm.avatar}
//             users={tm.users}
//           />   
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CardTeamList;
import { useEffect, useState } from 'react';
import { GetAllTeamsByUserId } from '../../Api';
import { TeamDataType } from '../../Reservations';
import CardTeam from '../Cards/CardTeam';

interface Props {
  teamId: string; 
}

const CardTeamList = ({ teamId }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [team, setTeam] = useState<TeamDataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!teamId) return;
        setLoading(true);
        const data = await GetAllTeamsByUserId(parseInt(teamId));
        setTeam(data);
      } catch (error) {
        console.error('Error fetching comment data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [teamId]);

  return (
    <div className="grid gap-3 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full my-6">
      {team?.map((tm, index) => (
        <div key={index} className=''>
          <CardTeam
            Name={tm.name}
            Id={tm.id}
            Avatar={tm.avatar}
            users={tm.users}
          />   
        </div>
      ))}
    </div>
  );
};

export default CardTeamList;
