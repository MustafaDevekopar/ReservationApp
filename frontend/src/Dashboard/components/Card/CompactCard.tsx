import React from "react";
import { motion } from "framer-motion";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {Icon} from "@iconify-icon/react"
import "./Card"

interface CompactCardProps {
  param: {
    color: { backGround: string; boxShadow: string };
    barValue: number;
    title: string;
    value: string;
    icon: string;
  };
  toggleExpanded: () => void;
}

const CompactCard: React.FC<CompactCardProps> = ({ param, toggleExpanded }) => {
  // const Png = param.icon;

  return (
    <motion.div
      className="flex flex-1 relative cursor-pointer rounded-xl text-white p-4 hover:shadow-none"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
      onClick={toggleExpanded}
    >
      <div className="radialBarD flex-1 flex flex-col gap-4">
        <CircularProgressbar
          value={param.barValue}
          text={`${param.barValue}%`}
        />
        <span className="text-4 font-bold">{param.title}</span>
      </div>
      <div className="detail flex-1 flex flex-col items-end justify-between">
        <Icon icon={param.icon} className="text-4xl" />
        <span className="font-bold text-xl">{param.value}</span>
        <span className="text-sm">اخر 24 ساعة</span>
      </div>
    </motion.div>
  );
};

export default CompactCard;
