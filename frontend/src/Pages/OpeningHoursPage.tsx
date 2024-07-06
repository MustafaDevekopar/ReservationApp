import { useState, useEffect, FC } from 'react';
import TimeSelector from '../Components/FootballFieldElement/TimeSelector';
import { useParams } from 'react-router';
import { FootbalfieldsGetById, updateOpeningHours } from '../Api';
import FullPageLoader from '../Components/FullPageLoader/FullPageLoader';
import { toast } from 'react-toastify';

interface OpeningHoursProps {
}

const OpeningHoursPage: FC<OpeningHoursProps> = () => {
  const [selectedHours, setSelectedHours] = useState<string[]>([]);
  const { fieldId } = useParams<{ fieldId?: string }>(); 
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!fieldId) return; 
        setLoading(true);
        const data = await FootbalfieldsGetById(parseInt(fieldId));
        const openingHouers: string[] = JSON.parse(data.userGet.openingHouer); 
        setSelectedHours(openingHouers); 
      } catch (error) {
        console.error('Error fetching football field data:', error);
      }finally{
        setLoading(false);
      }
    };

    fetchData(); 
  }, [fieldId]); 

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await updateOpeningHours(fieldId!, selectedHours);
      if (response.status = 200) {
        toast.success('تم التعديل بنجاح');
      } else {
        toast.error('حدث خطا ما');
      }
    } catch (error) {
      console.error(error);
      console.log('Error saving hours!');
    }finally{
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-md min-w-2xl mx-auto mt-6 ">
      {loading && <FullPageLoader />}
      <div className="mx-3">
        <h1 className="text-xl font-bold text-DarkGray">أختر اوقات الافتتاح</h1>
          <TimeSelector selectedHours={selectedHours} setSelectedHours={setSelectedHours} />
          <button 
            onClick={handleSubmit} 
            className="bg-Darkgreen rounded-xl w-full text-white px-4 py-2 "
          >
            حفظ التعديل
          </button>
      </div>

    </div>
  );
};

export default OpeningHoursPage;
