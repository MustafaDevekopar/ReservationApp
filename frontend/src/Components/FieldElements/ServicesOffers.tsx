import React, { useState } from 'react'
import ActiveLink from '../LinkStyled/ActiveLink'
import { Outlet, useLocation } from 'react-router';

type Props = {
  servicesPath: string;
  offersPath: string;
}

const ServicesOffers = ({servicesPath, offersPath}: Props) => {
    const flocation = useLocation();
    const [selectedPath, setSelectedPath] = useState<string>(flocation.pathname);
    const handleIconClick = (path: string) => {
      setSelectedPath(path);
    };
  return (
    <div>
    <div className="flex justify-center  ">
        <ActiveLink 
            path= {servicesPath}
            isSelected={selectedPath === servicesPath}
            TitleLink="الخدمات"
            onClick={handleIconClick}
        />
        <ActiveLink 
            path={offersPath}
            isSelected={selectedPath === offersPath}
            TitleLink="العروض"
            onClick={handleIconClick}
        /> 
    </div> 
    {/* disply services or offers */}
    <Outlet />                       
</div>
  )
}

export default ServicesOffers