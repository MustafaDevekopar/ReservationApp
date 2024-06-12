
import React from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";


const MainDash: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 lg:mt-16 xl:mt-16 w-full p-2">
      <Cards />
      <Table />
    </div>
  );
};

export default MainDash;
