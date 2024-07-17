
import React, { useEffect, useState } from 'react';
import { TeamDataType } from '../Reservations';
import { GetAllTeamsByUserId, sendNotificationToTeam } from '../Api';
import { useParams } from 'react-router';
import { DefaultAvatar } from '../assets/Image';
import { toast } from 'react-toastify';

const AddNotificationPage: React.FC = () => {
  const { userId } = useParams<{ userId?: string }>(); 
  const { fieldId } = useParams<{ fieldId?: string }>(); 
  const { reservationId } = useParams<{ reservationId?: string }>()
  const [teams, setTeams] = useState<TeamDataType[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        if (!userId) return;
        const fetchedTeams = await GetAllTeamsByUserId(parseInt(userId));
        setTeams(fetchedTeams);
      } catch (error) {
        console.error("Failed to fetch teams:", error);
      }
    };
    fetchTeams();
  }, [userId]);

  const handleSendNotification = async () => {
    if (selectedTeamId) {
      try {
        if (!userId || !fieldId || !reservationId) return;
        await sendNotificationToTeam(parseInt(userId), parseInt(fieldId), selectedTeamId, parseInt(reservationId));
        toast.success('تم الارسال بنجاح');
      } catch (error) {
        console.error("Failed to send notification:", error);
        toast.error('فشل الارسال');
      }
    } else {
      toast.error('اختر فريق اولا');
    }
  };

  return (
    <div className="">
      <h2 className="text-center py-4">ارسال اشعار للفريق</h2>
      <div className='px-2 flex flex-col gap-2 mx-0 sm:mx-6 md:mx-12 lg:mr-40 lg:ml-20 max-w-full bg-white py-4 md:px-4 lg:px-4'>
        <label className="block text-sm font-medium mb-4 ">اختر فريق</label>
        <div className="mt-1">
          {teams.map((team) => (
            <div key={team.id} className="flex items-center mb-2">
              <input
                type="radio"
                id={`team-${team.id}`}
                name="team"
                value={team.id}
                className="mx-2 h-6 w-6 rounded-full"
                checked={selectedTeamId === team.id}
                onChange={() => setSelectedTeamId(team.id)}
              />
              <label htmlFor={`team-${team.id}`} className="flex items-center">
                  <img src={ team.avatar === null  ? DefaultAvatar : `data:image/png;base64,${team.avatar}`}
                  alt={team.name} className="w-16 h-12 rounded-xl mx-2 object-cover" />

                <span>{team.name}</span>
              </label>
            </div>
          ))}
        </div>

        <button
          className="w-full my-4 bg-Darkgreen text-white  py-2 px-4 rounded-md hover:bg-green-500"
          onClick={handleSendNotification}
        >
          ارسال اشعار للفريق
        </button>        
      </div>

    </div>
  );
};

export default AddNotificationPage;
