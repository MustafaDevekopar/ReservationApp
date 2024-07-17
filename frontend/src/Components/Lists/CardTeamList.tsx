
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
            teamLeader={tm.teamLeader}
            users={tm.users}
          />   
        </div>
      ))}
    </div>
  );
};

export default CardTeamList;
