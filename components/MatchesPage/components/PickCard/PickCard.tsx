import React from "react";
import styles from "./PickCard.module.scss"; // Assuming you have a CSS module for styling
import { IMatch } from "@/types/games";
import {
  csgoIcon,
  dotaIcon,
  lolIcon,
  notFoundIcon,
} from "@/constants/StaticIcons";
import { useRouter } from "next/navigation";
import {
  extractBestPickedOdd,
  formatDate,
  getCorrectProviderUrl,
  getCorrectTime,
  getTodayString,
} from "@/utils/helpers";
import Image from "next/image";
import chevronRightIcon from "public/icons/chevron-right.svg";
import { SPORTBOOKS_STATIC } from "@/constants/SportsbooksData";

type PropsType = {
  pickItem: IMatch;
};

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
const PickCard: React.FC<PropsType> = ({ pickItem }) => {
  const router = useRouter();
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
  } = extractBestPickedOdd(pickItem, "winner");
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
    <div className={styles.wrapper} onClick={handlePicksCardClick}>
      <div className={styles.header_wrapper}>
        <div className={styles.header}>
          <div className={styles.teams}>
            <div className={styles.team}>
              <Image
                src={teamALogo || notFoundIcon}
                width={32}
                height={32}
                className={styles.game_icon}
                priority
                alt={`${teamAName} logo`}
              />
            </div>
            <div className={styles.team}>
              <Image
                src={teamBLogo || notFoundIcon}
                width={32}
                height={32}
                className={styles.game_icon}
                priority
                alt={`${teamBName} logo`}
              />
            </div>
          </div>
          <div className={styles.game_icon_wrapper}>
            <Image
              //@ts-ignore
              src={gamesImagesMap?.[pickItem?.esportCode] || notFoundIcon}
              className={styles.game_icon}
              priority
              alt={"icon"}
            />
          </div>
          <div className={styles.game_date}>
            <div className={styles.game_date_time}>
              {getCorrectTime(pickItem.beginAt)}
            </div>
            <div className={styles.game_date_string}>
              {getTodayString(formattedDate, false, false, true)}{" "}
            </div>
          </div>
          <div className={styles.header_chevron}>
            <Image
              src={chevronRightIcon || notFoundIcon}
              width={12}
              height={12}
              alt={""}
            />
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.match_info}>
          {/*//@ts-ignore*/}
          {gamesNamesMap[pickItem?.esportCode]}
          &nbsp;&middot;&nbsp;
          {pickItem.leagueName}
          &nbsp;&middot;&nbsp;
          {pickItem.tournamentName}
        </div>
      </div>
      <div className={styles.footer}>
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
              width={32}
              height={32}
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
          <div className={styles.footer_bet_value}>
            {bestOddValue.toFixed(2)}
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
        </a>
      </div>
    </div>
  );
};

export default PickCard;
