import React, { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify-icon/react";
import Chart from "react-apexcharts";
import "./Card.css"

interface ExpandedCardProps {
  param: {
    color: { backGround: string; boxShadow: string };
    title: string;
    series: any[];
  };
  toggleExpanded: () => void;
}

const ExpandedCard: React.FC<ExpandedCardProps> = ({ param, toggleExpanded }) => {

  const data = {
    options: {
      chart: {
        type: "area" as const,
        height: "auto",
      },
      
      // Add your other chart options here
    },
  };

  return (
    <motion.div // xs:top-32 xs:h-[50%] xs:left-6 md:top-8 md:h-[50%] md:left-6 lg:h-[70vh] xl:h-[70vh]
      className="absolute z-20  rounded-2xl flex flex-col items-center justify-around p-4
                  w-[90%] 
                  lg:w-[60%] xl:w-[60%]  lg:left-60 xl:left-60"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      // layoutId="expandableCard" 
    >
      <div className="cursor-pointer text-white self-end">
        <Icon icon="iconamoon:close" onClick={toggleExpanded} className="text-3xl"/>
      </div>
      <span className="text-white text-xl font-bold">{param.title}</span>
      <div className="lg:w-[80%] xl:w-[80] sm:w-full md:w-full ">
        <Chart options={data.options} series={param.series} type="area" />
      </div>
      <span className="">اخر 24 ساعه</span>
    </motion.div>
  );
};

export default ExpandedCard;
