import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import {
  formatDate,
  getCorrectTime,
  getTodayString,
  priceToString,
} from "@/utils/helpers";
import styles from "@/components/MatchesPage/MatchesPage.module.scss";
import { flameIcon, notFoundIcon } from "@/constants/StaticIcons";

import Link from "next/link";
import Image from "next/image";
import React from "react";

import { ESPORTS_SLUG_BY_CODE } from "@/constants/EsportCodes";
import { SPORTBOOKS_STATIC } from "@/constants/SportsbooksData";
import { findMaxValuesWithNames, getCorrectOddData } from "@/utils/odds";
import cls from "classnames";
import useWindowSize from "@/hooks/useWindowSize";

// @ts-ignore
const MatchHighlights = ({ matchesData }) => {
  const getCorrectSportbookLink = (
    provider_name: string | null,
    match_deeplink: string,
  ) => {
    if (!provider_name) {
      return;
    }
    if (!match_deeplink) {
      return SPORTBOOKS_STATIC[provider_name]?.link || "";
    }
    if (provider_name === "thunderpick") {
      return (
        match_deeplink +
        "?utm_source=cellxpert&utm_medium=cellxpert&utm_campaign=dd1e02a3-6256-4e8d-9752-5c405a88fce9&cxd=35614_413142"
      );
    }
    return match_deeplink;
  };
  return (
    <Swiper
      className={"swiper-matches"}
      pagination={{ clickable: true }}
      modules={[Pagination]}
    >
      {matchesData.map((item: any, index: number) => {
        const bestOddsValues = findMaxValuesWithNames(getCorrectOddData(item));

        const formattedDate = formatDate(item.beginAt);
        const leagueLogo = item.leagueLogo?.src || notFoundIcon.src;
        const leagueName = item.leagueName || "League name";
        const teamALogo = item.games[0].teams?.[0]?.logo || notFoundIcon.src;
        const teamAName = item.games[0].teams?.[0]?.name || "Team 1";
        const teamBLogo = item.games[0].teams?.[1]?.logo || notFoundIcon.src;
        const teamBName = item.games[0].teams?.[1]?.name || "Team 2";
        const homeMatchUrl = item.odds.find(
          (odd: any) => odd.provider === bestOddsValues.maxHomeName,
        )?.matchUrl;
        const homeMatchDeeplink = getCorrectSportbookLink(
          bestOddsValues.maxHomeName,
          homeMatchUrl,
        );
        const awayMatchUrl = item.odds.find(
          (odd: any) => odd.provider === bestOddsValues.maxAwayName,
        )?.matchUrl;
        const awayMatchDeeplink = getCorrectSportbookLink(
          bestOddsValues.maxAwayName,
          awayMatchUrl,
        );
        const drawMatchUrl = item.odds.find(
          (odd: any) => odd.provider === bestOddsValues.maxDrawName,
        )?.matchUrl;
        const drawMatchDeeplink = getCorrectSportbookLink(
          bestOddsValues.maxDrawName,
          drawMatchUrl,
        );
        const homeSportbookIcon =
          //@ts-ignore
          SPORTBOOKS_STATIC[bestOddsValues.maxHomeName]?.icon ||
          notFoundIcon.src;
        const awaySportbookIcon =
          //@ts-ignore
          SPORTBOOKS_STATIC[bestOddsValues.maxAwayName]?.icon ||
          notFoundIcon.src;
        const drawSportbookIcon =
          SPORTBOOKS_STATIC[bestOddsValues.maxDrawName]?.icon ||
          notFoundIcon.src;
        let matchHref = `/matches/${ESPORTS_SLUG_BY_CODE[item.esportCode]}/${
          item.id
        }`;

        return (
          <SwiperSlide key={index}>
            <Link href={matchHref} className={styles.highlightCard}>
              <div className={styles.mainData}>
                <div className={styles.mainDataLeague}>
                  <img
                    className={styles.mainDataLeagueLogo}
                    src={leagueLogo}
                    alt={`${leagueName} logo`}
                  />
                  <p className={styles.mainDataLeagueText}>
                    {leagueName}
                    &nbsp;&middot;&nbsp;
                    {getTodayString(formattedDate)}
                    &nbsp;&middot;&nbsp;
                    {getCorrectTime(item.beginAt)}
                  </p>
                </div>
                <div className={styles.mainDataBadges}>
                  <div className={styles.best_of_highlight}>
                    Bo{item.numberOfGames}
                  </div>
                  {item.status === "RUNNING" ? (
                    <div className={`${styles.badge} ${styles.badge_live}`}>
                      <span
                        className={`${styles.badge_live_dot} animate-pulse`}
                      ></span>
                      <span>Live</span>
                    </div>
                  ) : (
                    <div className={`${styles.badge} ${styles.badge_popular}`}>
                      <img
                        className={styles.badge_popular_img}
                        src={flameIcon.src}
                        alt=""
                      />
                      <span>Hot</span>
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.contentWrapper}>
                <div className={styles.teamsData}>
                  <div className={styles.teamData}>
                    <img src={teamALogo} alt={`${teamAName} logo`} />
                    <p>{teamAName} </p>
                  </div>
                  <div className={styles.teamData}>
                    <img src={teamBLogo} alt={`${teamBName} logo`} />
                    <p>{teamBName} </p>
                  </div>
                </div>
                <div className={styles.predictionBlock}>
                  {item.probTeamA && item.probTeamA * 100 !== 0 ? (
                    <div className={styles.predictionTeamA}>
                      <div className="flex flex-grow items-center lg:pl-2 lg:mr-2">
                        <div
                          className={cls({
                            [styles.chartValueLoose]: item.probTeamA * 100 < 50,
                            [styles.chartValueWin]: item.probTeamA * 100 >= 50,
                          })}
                          style={{
                            width: (item.probTeamA * 100).toFixed(2) + "%",
                            display: "flex",
                          }}
                        />
                      </div>

                      <p>{(item?.probTeamA * 100).toFixed(2) + "%"}</p>
                    </div>
                  ) : null}
                  {item?.probTeamB && item?.probTeamB * 100 !== 0 ? (
                    <div className={styles.predictionTeamB}>
                      <div className="flex flex-grow items-center lg:pl-2 lg:mr-2">
                        <div
                          className={cls({
                            [styles.chartValueLoose]: item.probTeamB * 100 < 50,
                            [styles.chartValueWin]: item.probTeamB * 100 >= 50,
                          })}
                          style={{
                            width: (item.probTeamB * 100).toFixed(2) + "%",
                          }}
                        />
                      </div>
                      <p>{(item.probTeamB * 100).toFixed(2) + "%"}</p>
                    </div>
                  ) : null}
                </div>
                <div className={styles.rightSide}>
                  <div className={styles.oddBlock}>
                    {bestOddsValues.maxHomeName && (
                      <a
                        href={homeMatchDeeplink}
                        target={"_blank"}
                        className={styles.oddBlockLinkWrapper}
                      >
                        <img
                          src={teamALogo}
                          alt={`${teamAName} logo`}
                          className={styles.teamLogo}
                        />
                        <p className={styles.bet_value}>
                          {priceToString(bestOddsValues.maxHome)}
                        </p>
                        <span
                          className={styles.bookmaker_icon_wrapper}
                          style={{
                            backgroundColor:
                              SPORTBOOKS_STATIC[bestOddsValues.maxHomeName]
                                ?.color || "transparent",
                          }}
                        >
                          <Image
                            src={homeSportbookIcon}
                            priority
                            alt={"icon"}
                            width={40}
                            height={40}
                            className={styles.bookmaker_icon}
                          />
                        </span>
                      </a>
                    )}
                  </div>
                  {bestOddsValues.maxDrawName ? (
                    <div className={styles.oddBlock}>
                      {bestOddsValues.maxDrawName && (
                        <a
                          href={drawMatchDeeplink}
                          target={"_blank"}
                          className={styles.oddBlockLinkWrapper}
                        >
                          <p className={styles.bet_value}>DRAW</p>
                          <p className={styles.bet_value}>
                            {priceToString(bestOddsValues.maxDraw)}
                          </p>
                          <span
                            className={styles.bookmaker_icon_wrapper}
                            style={{
                              backgroundColor:
                                SPORTBOOKS_STATIC[bestOddsValues.maxDrawName]
                                  ?.color || "transparent",
                            }}
                          >
                            <Image
                              src={drawSportbookIcon}
                              priority
                              alt={"icon"}
                              width={40}
                              height={40}
                              className={styles.bookmaker_icon}
                            />
                          </span>
                        </a>
                      )}
                    </div>
                  ) : null}

                  <div className={styles.oddBlock}>
                    {bestOddsValues.maxAwayName && (
                      <a
                        href={awayMatchDeeplink}
                        target={"_blank"}
                        className={styles.oddBlockLinkWrapper}
                      >
                        <img
                          src={teamBLogo}
                          alt={`${teamBName} logo`}
                          className={styles.teamLogo}
                        />
                        <p className={styles.bet_value}>
                          {priceToString(bestOddsValues.maxAway)}
                        </p>

                        <span
                          className={styles.bookmaker_icon_wrapper}
                          style={{
                            backgroundColor:
                              SPORTBOOKS_STATIC[bestOddsValues.maxAwayName]
                                ?.color || "transparent",
                          }}
                        >
                          <Image
                            src={awaySportbookIcon}
                            priority
                            alt={"icon"}
                            width={40}
                            height={40}
                            className={styles.bookmaker_icon}
                          />
                        </span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default MatchHighlights;
