
import { Outlet, useLocation } from 'react-router';
import { useState } from "react";
import ActiveLink from "../Components/LinkStyled/ActiveLink";
import CardReservationsList from '../Components/Lists/CardReservationsList';

type Props = {}

const ReservationsPage: React.FC<Props> = (props: Props): JSX.Element => {
  const location = useLocation();
  const [selectedPath, setSelectedPath] = useState<string>(location.pathname);
  const handleIconClick = (path: string) => {
    setSelectedPath(path);
  };

  return (
  <>
    <div className="flex justify-center items-center w-full my-4">
      <div className="flex justify-center gap-2 mx-5 sm:mx-6  md:mx-12 lg:mr-40 lg:ml-20  w-full mt-6 ">
        <ActiveLink 
            path="/reservations/current"
            isSelected={selectedPath === "/reservations/current"}
            TitleLink="الحجوزات الحالية"
            onClick={handleIconClick}
        />
        <ActiveLink 
            path="/reservations/previous"
            isSelected={selectedPath === "/reservations/previous"}
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