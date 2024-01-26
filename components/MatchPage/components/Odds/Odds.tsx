import styles from "./Odds.module.scss";
import React, { FC } from "react";
import { notFoundIcon } from "@/constants/StaticIcons";
import OddsRow from "@/components/MatchPage/components/Odds/OddsRow";
import { SPORTBOOKS_STATIC } from "@/constants/SportsbooksData";

// TODO: Refactor to higher order component
type PropsType = {
  matchData?: any;
};
const Odds: FC<PropsType> = ({ matchData }) => {
  const teamALogo = matchData?.games?.[0]?.teams?.[0]?.logo || notFoundIcon.src;
  const teamBLogo = matchData?.games?.[0]?.teams?.[1]?.logo || notFoundIcon.src;

  const sportsbooksArray = Object.keys(SPORTBOOKS_STATIC).map((key) => {
    return {
      provider: key,
    };
  });

  let oddsData = matchData?.odds || [];

  if (oddsData.length < sportsbooksArray.length) {
    const existingProviders = oddsData.map(
      (item: { provider: any }) => item.provider,
    );
    const missingProviders = sportsbooksArray.filter(
      (sportsbook) => !existingProviders.includes(sportsbook.provider),
    );
    oddsData = [...oddsData, ...missingProviders];
  }

  const data =
    matchData?.odds && matchData.odds.length > 0 ? oddsData : sportsbooksArray;

  return (
    <>
      <div className={styles.block_title}>Odds</div>
      <div className={styles.wrapper}>
        <div className={styles.teams}>
          <div className={`${styles.team} ${styles.teamA}`}>
            <img src={teamALogo} alt={`${matchData?.teamAName} logo`} />
            <p>{matchData?.teamAName || "Team 1"} </p>
          </div>
          <div className={styles.team_separator}>X</div>
          <div className={`${styles.team} ${styles.teamB}`}>
            <img src={teamBLogo} alt={`${matchData?.teamBName} logo`} />
            <p>{matchData?.teamBName || "Team 2"} </p>
          </div>
        </div>
        <div className={styles.odds_list}>
          {data?.map((item: any, index: number) => {
            let { matchUrl, provider } = item;
            let oddHome =
              item.winner?.home ||
              item.winner?.submarkets?.["period=default"]?.selections?.[0]
                ?.price ||
              "—";
            let oddAway =
              item.winner?.away ||
              item.winner?.submarkets?.["period=default"]?.selections?.[1]
                ?.price ||
              "—";
            let oddDraw =
              item.winner?.draw ||
              item.winner?.submarkets?.["period=default"]?.selections?.[2]
                ?.price ||
              null;

            return (
              <OddsRow
                providerName={provider}
                oddHome={oddHome}
                oddAway={oddAway}
                oddDraw={oddDraw}
                matchUrl={matchUrl}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Odds;
