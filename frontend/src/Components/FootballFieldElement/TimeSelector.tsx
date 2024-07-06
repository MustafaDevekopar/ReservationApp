
import React, { FC } from 'react';
import { formatTime } from '../ReserveElement/Helpers';

const hoursList = [
  "08:00","09:00", "10:00", "11:00", "12:00", "13:00", "14:00","15:00", 
  "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", 
  "24:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00"
];

interface TimeSelectorProps {
  selectedHours: string[];
  setSelectedHours: (hours: string[]) => void;
}

const TimeSelector: FC<TimeSelectorProps> = ({ selectedHours, setSelectedHours }) => {
  const handleToggle = (hour: string) => {
    if (selectedHours.includes(hour)) {
      setSelectedHours(selectedHours.filter(h => h !== hour));
    } else {
      setSelectedHours([...selectedHours, hour]);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2 my-8">
      {hoursList.map(hour => (
        <label key={hour} className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={selectedHours.includes(hour)}
            onChange={() => handleToggle(hour)}
            className="hidden" // Hide the default checkbox
          />
          <div className={`h-7 w-7 my-1 rounded-full border border-gray-300 flex items-center justify-center transition-colors 
            ${selectedHours.includes(hour) ? 'bg-Darkgreen border-Darkgreen' : 'bg-white'}`}>
            {/* Custom checkbox design */}
            {selectedHours.includes(hour) && <span className="text-white">✔</span>}
          </div>
          {/* <span className="text-DarkGray">{formatTime(new Date(hour))}</span> */}
          <span className="text-DarkGray">{ formatTime(new Date(`2024-2-2 ${hour}:00:0000`))}</span>
        </label>
      ))}
    </div>
  );
};

export default TimeSelector;
