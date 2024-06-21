
import React, { useState } from 'react';
import CardList from "../Components/Lists/CardList";
import DropdownCat from "../Components/Dropdowns/DropdownCat";

type Props = {}

const SearchPage: React.FC<Props> = (props: Props): JSX.Element => {
  const [selectedGovernorate, setSelectedGovernorate] = useState<number | null>(null);

  return (
    <div>
      <div className="flex justify-center items-center w-full">
        <div className="flex gap-1 mx-3 sm:mx-6 md:mx-12 lg:mr-20 lg:ml-8 w-full my-6">
          <DropdownCat selectedGovernorate={selectedGovernorate} setSelectedGovernorate={setSelectedGovernorate} />
        </div>
      </div>
      <div className="flex justify-center items-center w-full">
        <CardList selectedGovernorate={selectedGovernorate} />
      </div>
    </div>
  );
};

export default SearchPage;
