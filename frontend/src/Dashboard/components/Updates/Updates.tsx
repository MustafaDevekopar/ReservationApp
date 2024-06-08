
import React from "react";
import { UpdatesData } from "./UpdatesData";

interface Update {
  img: string;
  name: string;
  noti: string;
  time: string;
}

const Updates: React.FC = () => {
  return (
    <div className="Updatesxb sm:w-full md:w-full lg:w-[95%] xl:w-[95%] bg-white rounded-xl p-4 gap-4 flex flex-col text-sm  ">
      {UpdatesData.map((update: Update, index: number) => {
        return (
          <div className="flex gap-2" key={index}>
            <img src={update.img} alt="profile" className="w-12 h-12" />
            <div className="noti">
              <div style={{ marginBottom: "0.5rem" }}>
                <span className="font-bold">{update.name}</span>
                <span> {update.noti}</span>
              </div>
              <span>{update.time}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Updates;
