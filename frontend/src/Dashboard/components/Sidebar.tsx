
import React, { useState } from "react";
import "./Sidebar.css";
import { SidebarData } from "./SidebarDatats";
import { motion } from "framer-motion";
import { Icon } from "@iconify-icon/react";
import { Link } from "react-router-dom";


const Sidebar: React.FC = ()  => {
  const [selected, setSelected] = useState<number>(0);
  const [expanded, setExpanded] = useState<boolean>(true);

  const sidebarVariants = {
    true: {
      left: '0',
    },
    false: {
      left: '-60%',
    },
  };

  console.log(window.innerWidth);

  return (
    <>
      {/* <div
        className={`flex fixed top-8 left-[60%] bg-white shadow-md p-3 rounded-xl z-10
          ${expanded ? ("left-[60%]"): ("left-[5%]") }`}
        onClick={() => setExpanded(!expanded)}
      >
        <UilBars />
      </div> */}
      <motion.div
        className="sidebar hidden relative pt-16 transition-all duration-300 ease-in-out
                  lg:flex lg:flex-col xl:flex xl:flex-col "
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ''}
      >
        {/* logo */}
        <div className="flex justify-center items-center gap-4 text-Darkgreen font-bold text-xl h-[4%] ">
          <Link to={"/"}>
            <Icon icon="ion:football" className=" text-4xl"/>
            <span >بلنتي</span>
          </Link>
        </div>

        <div className="menuD flex flex-col justify-between gap-8 mt-16">
          {SidebarData.map((item, index) => (
            <Link to={`${item.path}`}
              className={`menuItem rounded-l-xl text-md  gap-2 py-2 cursor-pointer flex items-center 
                ${selected === index ? "bg-Darkgreen text-white transition-all duration-500 ease-in-out justify-center" 
                                     : "text-Darkgreen mr-2 relative "}`}
              key={index}
              onClick={() => setSelected(index)}
            >
              <Icon icon={item.icon} className="text-xl"/>

              <span className="block">{item.heading}</span>
            </Link>
          ))}
          {/* signoutIcon */}
          <div className=" text-md  gap-2 py-2 cursor-pointer flex  justify-center text-WhiteRed">
            {/* <UilSignOutAlt /> */}
            <Icon icon="uil:signout" className="text-xl" />
            <span className="block">تسجيل خروج</span>

          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;

