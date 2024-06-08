
import React, { useState } from "react";
import ExpandedCard from "./ExpandedCard";
import CompactCard from "./CompactCard";


interface CardProps {
  compactCardProps: {
    color: { backGround: string; boxShadow: string };
    barValue: number;
    title: string;
    value: string;
    icon: string;
  };
  expandedCardProps: {
    color: { backGround: string; boxShadow: string };
    title: string;
    series: any[];
  };
}

const Card: React.FC<CardProps> = ({ compactCardProps, expandedCardProps }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return expanded ? (
    <ExpandedCard param={expandedCardProps} toggleExpanded={toggleExpanded} />
  ) : (
    <CompactCard param={compactCardProps} toggleExpanded={toggleExpanded} />// error fix it ... Property 'icon' is missing in type '{ color: { backGround: string; boxShadow: string; }; barValue: number; title: string; value: string; png: any; }' but required in type '{ color: { backGround: string; boxShadow: string; }; barValue: number; title: string; value: string; icon: string; }'.ts(2741)
  );
};

export default Card;
