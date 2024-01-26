import React from "react";
import styles from "@/components/MatchPage/components/Odds/Odds.module.scss";
import Image from "next/image";
import { SPORTBOOKS_STATIC } from "@/constants/SportsbooksData";
import { notFoundIcon } from "@/constants/StaticIcons";
import Link from "next/link";
import { getCorrectUrlForSportbook, priceToString } from "@/utils/helpers";

type PropsType = {
  providerName: string;
  oddHome: number;
  oddDraw?: number;
  oddAway: number;
  matchUrl?: string;
};
export const OddsRow: React.FC<PropsType> = ({
  providerName,
  oddHome,
  oddAway,
  oddDraw,
  matchUrl,
}) => {
  return (
    <div className={styles.odds_row}>
      <div className={styles.sportbook_logo} style={{backgroundColor:SPORTBOOKS_STATIC[providerName]?.color || 'transparent'}}>
        <Image
          src={SPORTBOOKS_STATIC[providerName]?.icon || notFoundIcon}
          width={75} height={40}
          priority
          alt={providerName}
          className={styles.sportbook_logo_img}
        />
      </div>
      <div className={ `odds ${oddDraw && `odds_draw`}`}>
        <a
          href={
            matchUrl
              ? getCorrectUrlForSportbook(matchUrl, providerName)
              : SPORTBOOKS_STATIC[providerName]?.link
          }
          className={styles.odds_value}
          target="_blank"
        >
          {priceToString(oddHome)}
        </a>
        {oddDraw && (
          <a
            href={
              matchUrl
                ? getCorrectUrlForSportbook(matchUrl, providerName)
                : SPORTBOOKS_STATIC[providerName]?.link
            }
            target="_blank"
            className={styles.odds_value}
          >
            {priceToString(oddDraw)}
          </a>
        )}
        <a
          href={
            matchUrl
              ? getCorrectUrlForSportbook(matchUrl, providerName)
              : SPORTBOOKS_STATIC[providerName]?.link
          }
          className={styles.odds_value}
          target="_blank"
        >
          {priceToString(oddAway)}
        </a>
      </div>
    </div>
  );
};
export default OddsRow;
