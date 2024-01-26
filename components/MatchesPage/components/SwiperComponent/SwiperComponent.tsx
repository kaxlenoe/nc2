import React from "react";
import MatchHighlights from "./components/MatchHighlights";
import SpecialOffers from "./components/SpecialOffers";

type PropsType = {
  matchesData?: any;
  specialOffers?: any;
};

const SwiperComponent: React.FC<PropsType> = ({
  matchesData,
  specialOffers,
}) => {
  return matchesData ? (
    <MatchHighlights matchesData={matchesData} />
  ) : (
    <SpecialOffers specialOffers={specialOffers} />
  );
};

export default SwiperComponent;
