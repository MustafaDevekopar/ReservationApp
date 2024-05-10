
import { Outlet } from 'react-router';
import { useState } from "react";
import ActiveLink from "../Components/LinkStyled/ActiveLink";

type Props = {}

const ReservationsPage = (props: Props) => {

  const [selectedPath, setSelectedPath] = useState<string>("");
  const handleIconClick = (path: string) => {
    setSelectedPath(path);
  };

  return (
  <>
    <div className="flex justify-center items-center w-full my-4">
      <div className="flex justify-center gap-2 mx-5 sm:mx-6  md:mx-12 lg:mr-40 lg:ml-20  w-full mt-6 ">
        <ActiveLink 
            path=""
            isSelected={selectedPath === ""}
            TitleLink="الحجوزات الحالية"
            onClick={handleIconClick}
        />
        <ActiveLink 
            path="previous"
            isSelected={selectedPath === "previous"}
            TitleLink="حجوزات سابقه"
            onClick={handleIconClick}
        />
      </div>
    </div>
    {/* to get current or previous reservation cards */}
    <Outlet />
    </>
  )
}

export default ReservationsPage