"use client";

import Image from "next/image";

import { csgoIcon, dotaIcon, lolIcon } from "@/constants/StaticIcons";
import ai from "public/icons/ai.svg";

import React, { FC, useEffect, useState } from "react";
import cls from "classnames";

import { findMaxValuesWithNames, getCorrectOddData } from "@/utils/odds";
import SwiperComponent from "./components/SwiperComponent/SwiperComponent";

import "swiper/css";
import "swiper/scss/pagination";
import styles from "@/components/MatchesPage/MatchesPage.module.scss";
import "./MatchesPage.scss";

import SwitchToggle from "./components/Toggle/Toggle";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Search } from "@/components/MatchesPage/components/Search";
import { GamesButtons } from "@/components/MatchesPage/components/GamesButtons";
import { PicksGamesButtons } from "@/components/MatchesPage/components/PicksGamesButtons";
import MatchList from "@/components/MatchesPage/components/MatchList/MatchList";
import { Tournaments } from "@/components/MatchesPage/components/Tournaments";
import { PromoSideBanner } from "@/components/MatchesPage/components/PromoSideBanner";
import { Breadcrumbs } from "../Breadcrumbs";

import { Archivo } from "next/font/google";
import PickCard from "@/components/MatchesPage/components/PickCard/PickCard";

const archivo = Archivo({ subsets: ["latin-ext"] });
type PropsType = {
  data?: any;
  dataTournaments?: any;
  resultsData?: any;
  sidebarLandingData?: any;
  landingData?: any;
  highlightsData?: any;
  picksData?: any;
};

const MatchesPage: FC<PropsType> = ({
  data,
  dataTournaments,
  resultsData,
  sidebarLandingData,
  landingData,
  highlightsData,
  picksData,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>("UPCOMING");
  const [isPredictionSwitchToggled, setIsPredictionSwitchToggled] =
    useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const filter = searchParams.get("filter");
    if (filter) {
      setActiveFilter(filter.toUpperCase());
    }
  }, []);
  const pathname = usePathname();

  const getCorrectTitle = () => {
    if (pathname.includes("matches")) {
      if (pathname.includes("counter-strike"))
        return (
          <h1 className={styles.title}>
            <img className={styles.gameTitleIcon} src={csgoIcon.src} />
            CS2 \ CS:GO matches
          </h1>
        );
      if (pathname.includes("dota-2"))
        return (
          <h1 className={styles.title}>
            <img className={styles.gameTitleIcon} src={dotaIcon.src} />
            Dota 2 matches
          </h1>
        );
      if (pathname.includes("league-of-legends"))
        return (
          <h1 className={styles.title}>
            <img className={styles.gameTitleIcon} src={lolIcon.src} />
            League of Legends matches
          </h1>
        );
    }
    if (pathname.includes("tournaments")) {
      if (pathname.includes("dota-2")) {
        return (
          <h1 className={styles.title}>
            <img className={styles.gameTitleIcon} src={dotaIcon.src} />
            Dota 2 tournaments
          </h1>
        );
      } else if (pathname.includes("counter-strike")) {
        return (
          <h1 className={styles.title}>
            <img className={styles.gameTitleIcon} src={csgoIcon.src} />
            CS2 \ CS:GO tournaments
          </h1>
        );
      } else if (pathname.includes("league-of-legends")) {
        return (
          <h1 className={styles.title}>
            <img className={styles.gameTitleIcon} src={lolIcon.src} />
            League of Legends tournaments
          </h1>
        );
      }
      return <h1 className={styles.title}>Tournaments</h1>;
    }

    if (
      pathname.includes("/matches") &&
      !pathname.includes("dota-2") &&
      !pathname.includes("counter-strike") &&
      !pathname.includes("league-of-legends")
    )
      return (
        <>
          <h1 className={styles.title}>Matches</h1>
        </>
      );

    return (
      <h1 className={`${styles.title_landing} ${archivo.className}`}>
        <strong>Neon Cheese</strong> — your AI eSport betting companion
      </h1>
    );
  };

  const isRoot =
    !pathname.includes("/matches") &&
    !pathname.includes("dota-2") &&
    !pathname.includes("counter-strike") &&
    !pathname.includes("league-of-legends");

  const isMatchesPage = pathname.includes("matches");

  const search = searchParams.get("search");
  const handleFilterClick = (filterType: string) => {
    setActiveFilter(filterType);

    if (search) {
      router.push(
        `?filter=${filterType.toLowerCase()}&search=${encodeURIComponent(
          search,
        )}`,
        { scroll: false },
      );
    } else {
      router.push(`?filter=${filterType.toLowerCase()}`, { scroll: false });
    }
  };

  return (
    <>
      {!isRoot && <Breadcrumbs />}
      <div className={styles.title_wrapper}>{getCorrectTitle()}</div>
      <p className={`${styles.sub_title} ${archivo.className}`}>
        Up-to-the-Minute Match Feeds and Real-Time Odds. Stay Ahead of the Game!
      </p>

      {isMatchesPage ? (
        <div>
          <SwiperComponent matchesData={highlightsData} />
        </div>
      ) : null}

      {isRoot ? (
        <>
          <div>
            <SwiperComponent specialOffers={landingData} />
          </div>
        </>
      ) : null}

      <div
        className={`${styles.matchesContentWrapper} flex gap-[24px] select-none`}
      >
        <div className="flex flex-col md:basis-[820px]">
          <div className={styles.matchesFeedHeader}>
            {isRoot ? (
              <div className={styles.matchesFeedHeading}>Top matches</div>
            ) : null}
            <GamesButtons fromMatchesPage={isMatchesPage} />

            {isMatchesPage ? (
              <Search
                placeholder="Search teams, matches or tournaments"
                activeFilter={activeFilter}
              />
            ) : null}
          </div>
          <div className={styles.ai}>
            {!isRoot ? (
              <div className={styles.matchesFilter}>
                <div
                  className={cls(styles.filterButton, {
                    [styles.active]: activeFilter === "UPCOMING",
                  })}
                  onClick={() => {
                    handleFilterClick("UPCOMING");
                  }}
                >
                  Upcoming
                </div>
                <div
                  className={cls(styles.filterButton, {
                    [styles.active]: activeFilter === "RUNNING",
                  })}
                  onClick={() => {
                    handleFilterClick("RUNNING");
                  }}
                >
                  Live
                </div>
                <div
                  className={cls(styles.filterButton, {
                    [styles.active]: activeFilter === "PAST",
                  })}
                  onClick={() => {
                    handleFilterClick("PAST");
                  }}
                >
                  Results
                </div>
              </div>
            ) : null}
            {activeFilter !== "PAST" ? (
              <div className={styles.aiPredictionSwitchWrapper}>
                <button
                  className={styles.aiPredictionSwitchLabel}
                  onClick={() => {
                    setIsPredictionSwitchToggled(!isPredictionSwitchToggled);
                  }}
                >
                  <Image src={ai} width={24} height={24} alt={"icon"} />
                  <p>AI predictions</p>
                </button>
                <SwitchToggle
                  setIsToggled={setIsPredictionSwitchToggled}
                  isToggled={isPredictionSwitchToggled}
                />
              </div>
            ) : null}
          </div>

          <MatchList
            activeFilter={activeFilter}
            data={data}
            resultsData={resultsData}
            isPredictionToggled={isPredictionSwitchToggled}
          />

          {isRoot ? (
            <>
              <div className={styles.picksFeedHeader}>
                {isRoot ? (
                  <div className={styles.picksFeedHeading}>Top Picks</div>
                ) : null}
                <PicksGamesButtons isMatches={isMatchesPage} />
              </div>
              <div className={styles.picksFeed}>
                {picksData.map((pick: any, index: number) => (
                  <PickCard pickItem={pick} key={index} />
                ))}
              </div>
            </>
          ) : null}
        </div>
        <div className="flex flex-col basis-[384px] gap-[24px]">
          <Tournaments dataTournaments={dataTournaments} />
          <PromoSideBanner sidebarLandingData={sidebarLandingData} />
        </div>
      </div>
    </>
  );
};

export default MatchesPage;
