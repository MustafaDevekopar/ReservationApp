
import React from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import "./MainDash.css"


const MainDash: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 lg:mt-10 xl:mt-10 w-full p-2 h-screen">

        <Cards />
      <div className="scrollClass max-h-[65%] overflow-hidden overflow-y-scroll bg-white">
        <Table />
      </div>
      
      
    </div>
  );
};

export default MainDash;
