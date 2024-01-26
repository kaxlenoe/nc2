"use client";
import React, { FC } from "react";
import {
  extractBestPickedOdd,
  formatDate,
  getCorrectProviderUrl,
  getCorrectTime,
  getTodayString,
} from "@/utils/helpers";
import {
  csgoIcon,
  dotaIcon,
  lolIcon,
  notFoundIcon,
} from "@/constants/StaticIcons";
import { IMatch } from "@/types/games";
import styles from "./PicksCard.module.scss";
import Image from "next/image";
import { SPORTBOOKS_STATIC } from "@/constants/SportsbooksData";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface IPicksCardProps {
  pickItem: IMatch;
  key: any;
}

const gamesImagesMap = {
  lol: lolIcon,
  dota2: dotaIcon,
  csgo: csgoIcon,
};
const gamesNamesMap = {
  lol: "LOL",
  dota2: "DOTA2",
  csgo: "CS2",
};
//
// interface IPickedOdd {
//     value: number;
//     provider: string;
//     teamName: string;
//     logo: string | null;
// }

const PicksCard: FC<IPicksCardProps> = ({ pickItem, key }) => {
  const router = useRouter();

  const pickedOdd = extractBestPickedOdd(pickItem, "winner");

  const {
    //@ts-ignore
    value: bestOddValue,
    //@ts-ignore
    provider: bestOddProvider,
    //@ts-ignore
    teamName: bestOddTeamName,
    //@ts-ignore
    teamLogo: bestOddTeamLogo,
    //@ts-ignore
    pathType: bestOddType,
    //@ts-ignore
    diffPercentage: bestOddDiffPercentage,
    //@ts-ignore
    matchUrl: bestOddMatchUrl,
  } = pickedOdd;

  const teamALogo = pickItem.games[0].teams?.[0]?.logo || notFoundIcon.src;
  const teamAName = pickItem.games[0].teams?.[0]?.name || "Team 1";
  const teamBLogo = pickItem.games[0].teams?.[1]?.logo || notFoundIcon.src;
  const teamBName = pickItem.games[0].teams?.[1]?.name || "Team 2";

  const BET_TYPE_READABLE = {
    winner: "Match winner",
  };
  const formattedDate = formatDate(pickItem.beginAt);

  const correctProviderUrl = getCorrectProviderUrl(
    bestOddProvider,
    bestOddMatchUrl,
  );
  // console.log( 'correctProviderUrl', correctProviderUrl)
  const getCorrectMatchUrlFromPickItem = (pickItem: IMatch) => {
    const gamesSlugsMap = {
      lol: "league-of-legends",
      dota2: "dota-2",
      csgo: "counter-strike",
    };
    //@ts-ignore
    const gameSlug = gamesSlugsMap[pickItem.esportCode];
    const teamASlug = teamAName.replaceAll(" ", "-");
    const teamBSlug = teamBName.replaceAll(" ", "-");

    return `/matches/${gameSlug}/${teamASlug}-vs-${teamBSlug}-${pickItem.id}`;
  };
  const handlePicksCardClick = () => {
    // router.push( getCorrectProviderUrl( bestOddProvider, bestOddMatchUrl ) );
    router.push(getCorrectMatchUrlFromPickItem(pickItem));
  };

  return (
    <div key={key} onClick={handlePicksCardClick} className={styles.wrapper}>
      <div className={styles.header}>
        <Image
          //@ts-ignore
          src={gamesImagesMap[pickItem?.esportCode] || notFoundIcon}
          className={styles.game_icon}
          priority
          alt={"icon"}
        />
        <div className={styles.match_info}>
          {/*//@ts-ignore*/}
          {gamesNamesMap[pickItem?.esportCode]}
          &nbsp;&middot;&nbsp;
          {pickItem.leagueName}
          &nbsp;&middot;&nbsp;
          {pickItem.tournamentName}
          &nbsp;&middot;&nbsp;
          {getTodayString(formattedDate)}
          &nbsp;&middot;&nbsp;
          {getCorrectTime(pickItem.beginAt)}
        </div>
      </div>
      <div className={styles.card_body}>
        <div className={styles.teams}>
          <div className={styles.team}>
            <Image
              src={teamALogo || notFoundIcon}
              width={32}
              height={32}
              className={styles.team_logo}
              alt={`${teamAName} logo`}
            />
            <span className={styles.team_name}>{teamAName}</span>
          </div>
          <div className={styles.team_divider}>—</div>
          <div className={styles.team}>
            <Image
              src={teamBLogo || notFoundIcon}
              width={32}
              height={32}
              className={styles.team_logo}
              alt={`${teamBName} logo`}
            />
            <span className={styles.team_name}>{teamBName}</span>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.footer_text}>
          Our prediction on {bestOddTeamName} is {bestOddDiffPercentage}% higher
          than {SPORTBOOKS_STATIC[bestOddProvider]?.readableName} expectation
        </div>
        <div className={styles.footer_bottom}>
          <div className={styles.footer_pick}>
            <div className={styles.footer_pick_type}>
              {
                //@ts-ignore
                BET_TYPE_READABLE[bestOddType]
              }
            </div>
            <div className={styles.footer_pick_team}>
              <Image
                src={bestOddTeamLogo || notFoundIcon}
                width={24}
                height={24}
                className={styles.footer_pick_logo}
                alt={`${teamBName} logo`}
              />
              <div className={styles.footer_pick_team_name}>
                {bestOddTeamName}
              </div>
            </div>
          </div>
          <a
            href={correctProviderUrl}
            className={styles.footer_bet}
            target={"_blank"}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.footer_bet_diff}>
              +{bestOddDiffPercentage}%
            </div>
            <div
              className={styles.footer_bet_logo_wrapper}
              style={{
                backgroundColor:
                  SPORTBOOKS_STATIC[bestOddProvider]?.color || "transparent",
              }}
            >
              <Image
                src={SPORTBOOKS_STATIC[bestOddProvider]?.icon || notFoundIcon}
                width={75}
                height={32}
                className={styles.footer_bet_logo}
                alt={`${teamBName} logo`}
              />
            </div>
            <div className={styles.footer_bet_value}>
              {bestOddValue.toFixed(2)}
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PicksCard;
