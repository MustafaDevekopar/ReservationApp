import React from "react";
import "./Cards.css";
import { cardsData } from "./CardsData";
import Card from "../Card/Card";

const Cards: React.FC = () => {
  return (
    <div className="grid gap-3 
    grid-cols-1 sm:grid-cols-1  md:grid-cols-1  lg:grid-cols-3 xl:grid-cols-3 
      w-full ">
      {cardsData.map((card, id) => {
        return (
          <div className="w-full" key={id}>
            <Card
              compactCardProps={card.compactCardProps}
              expandedCardProps={card.expandedCardProps}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
