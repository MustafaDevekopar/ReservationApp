
import React, { useEffect, useState } from 'react';
import { CategoryType } from '../../Reservations';
import { CategoryGet } from '../../Api';

type Props = {
  selectedCategory: number | null;
  setSelectedCategory: (id: number | null) => void;
};

const DropdownCategory: React.FC<Props> = ({ selectedCategory, setSelectedCategory }) => {
  const [category, setCategory] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const gData = await CategoryGet();
        setCategory(gData);
      } catch (error) {
        console.error('Error fetching governorates:', error);
      }
    };

    fetchCategory();
  }, []);

  return (
    <div className="relative w-24 lg:max-w-sm">
      <select
        className="w-full p-1 text-sm text-DarkGray bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-Darkgreen"
        value={selectedCategory ?? ''}
        onChange={(e) => setSelectedCategory(Number(e.target.value) || null)}
      >
        <option className="text-sm" value="">
          نوع الملعب...
        </option>
        {category.map((cat) => (
          <option className="text-sm" key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownCategory;
