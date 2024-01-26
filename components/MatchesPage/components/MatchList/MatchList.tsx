import React from "react";
import MatchCard from "../MatchCard/MatchCard";

type PropsType = {
  activeFilter: any;
  data: any;
  resultsData: any;
  isPredictionToggled: boolean;
};
const MatchList: React.FC<PropsType> = ({
  activeFilter,
  data,
  resultsData,
  isPredictionToggled,
}) => {
  const filteredData = (activeFilter === "PAST" ? resultsData : data)?.filter(
    (item: { status: any }) => item?.status === activeFilter,
  );


  if (!filteredData.length)
    return (
      <p className="py-12 mb-6 rounded-[12px] bg-blend-colo flex justify-center items-center border-2 border-nch-800 text-nch-700 select-none md:">
        No matches data available
      </p>
    );
  return (
    <div>
      {filteredData?.map((item: any, index: React.Key | null | undefined) => (
        <MatchCard
          key={index}
          match={item}
          isPredictionToggled={isPredictionToggled}
          activeFilter={activeFilter}
        />
      ))}
    </div>
  );
};

export default MatchList;
