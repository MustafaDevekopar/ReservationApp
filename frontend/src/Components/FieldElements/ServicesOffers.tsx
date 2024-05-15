import React, { useState } from 'react'
import ActiveLink from '../LinkStyled/ActiveLink'
import { Outlet, useLocation } from 'react-router';

type Props = {}

const ServicesOffers = (props: Props) => {
    const flocation = useLocation();
    const [selectedPath, setSelectedPath] = useState<string>(flocation.pathname);
    const handleIconClick = (path: string) => {
      setSelectedPath(path);
    };
  return (
    <div>
    <div className="flex justify-center  ">
        <ActiveLink 
            path="/showfield/services"
            isSelected={selectedPath === "/showfield/services"}
            TitleLink="الخدمات"
            onClick={handleIconClick}
        />
        <ActiveLink 
            path="/showfield/offers"
            isSelected={selectedPath === "/showfield/offers"}
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