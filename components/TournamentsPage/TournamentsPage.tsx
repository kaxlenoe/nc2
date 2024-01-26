"use client";
import styles from "@/components/TournamentsPage/TournamentsPage.module.scss";
import logo from "public/icons/logoNew.svg";
import {notFoundIcon} from "@/constants/StaticIcons";

import React, { FC,  useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import cls from "classnames";
import matchPageStyles from "@/components/MatchesPage/MatchesPage.module.scss";
import { GamesButtons } from "@/components/MatchesPage/components/GamesButtons";
import { PromoSideBanner } from "@/components/MatchesPage/components/PromoSideBanner";
import { Breadcrumbs } from "../Breadcrumbs";
import { removeSpaces } from "@/utils/helpers";
import {
  chevronRightIcon,
  csgoIcon,
  dotaIcon,
  lolIcon,
} from "@/constants/StaticIcons";
import Image from "next/image";
import SelectTournamentComponent from "@/components/MatchesPage/components/SelectTournament/SelectTournamentComponent";
import { Search } from "@/components/MatchesPage/components/Search";

type PropsType = {
  dataTournaments?: any;
  sidebarLandingData?: any;
};

const TournamentsPage: FC<PropsType> = ({
  dataTournaments,
  sidebarLandingData,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>("UPCOMING");

  const imageMap = {
    lol: lolIcon,
    dota2: dotaIcon,
    csgo: csgoIcon,
  };
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const filter = searchParams.get("filter");
    if (filter) {
      setActiveFilter(filter.toUpperCase());
    }
  }, []);

  const handleFilterClick = (filterType: string) => {
    setActiveFilter(filterType);
    router.replace(`?filter=${filterType.toLowerCase()}`);
  };

  const pathname = usePathname();
  const getCorrectTitleV2 = (pathname: string) => {
    const titles = {
      "counter-strike": `CS2 \\ CS:GO tournaments`,
      "dota-2": "Dota 2 tournaments",
      "league-of-legends": "League of Legends tournaments",
    };
    const icons = {
      "counter-strike": csgoIcon,
      "dota-2": dotaIcon,
      "league-of-legends": lolIcon,
    };

    for (const key in titles) {
      if (pathname.includes(key)) {
        return (
          <>
            <h1 className={styles.tournamentsPageTitle}>
              <img
                className={styles.gameTitleIcon}
                src={
                  //@ts-ignore
                  icons[key].src
                }
                alt=""
              />
              {
                //@ts-ignore
                titles[key]
              }
            </h1>
          </>
        );
      }
    }

    if (pathname.includes("/tournaments")) {
      return <h1 className={styles.tournamentsPageTitle}>Tournaments</h1>;
    }

    return (
      <div style={{ display: "flex" }}>
        <h1 className={styles.subTitle}>
          <span className="font-bold mr-[6px]">Neon Cheese </span>— your AI
          eSport betting companion
        </h1>
      </div>
    );
  };

  const isRoot =
    !pathname.includes("/matches") &&
    !pathname.includes("dota-2") &&
    !pathname.includes("counter-strike") &&
    !pathname.includes("league-of-legends");

  const createLink = (item: { esportCode: string; id: any; name: string }) => {
    if (item.esportCode === "csgo") {
      return `/tournaments/counter-strike/${removeSpaces(item.name)}-${
        item.id
      }`;
    } else if (item.esportCode === "dota2") {
      return `/tournaments/dota-2/${removeSpaces(item.name)}-${item.id}`;
    } else if (item.esportCode === "lol") {
      return `/tournaments/league-of-legends/${removeSpaces(item.name)}-${
        item.id
      }`;
    }
  };

  const handleClick = (item: { esportCode: string; id: any }) => {
    // @ts-ignore
    router.push(createLink(item));
  };

  const returnTournamentsPlaceholder = () => {
    if (!dataTournaments?.length)
      return (
        <p className="h-36 rounded-[12px] bg-blend-colo flex justify-center items-center border-2 border-nch-800 text-nch-700 select-none">
          No tournaments data available
        </p>
      );
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <Breadcrumbs />
        <div className={styles.title}>{getCorrectTitleV2(pathname)}</div>
      </div>
      <h2 className={styles.description}>
        Explore latest upcoming tournaments and leagues
      </h2>

      <div className="flex flex-col lg:flex-row gap-[24px] select-none mb-[40px] lg:mb-[60px]">
        <div className="flex flex-col flex-grow">
          <div className={styles.tournamentsFeedHeader}>
            <GamesButtons fromTournamentsPage={true} />
            <Search placeholder={"Search tournaments"} />
          </div>
          <div>{returnTournamentsPlaceholder()}</div>
          <div className={styles.tournamentCardsWrapper}>
            {dataTournaments?.map((item: any) => {
              return (
                <div
                  key={item.id}
                  className={styles.tournamentCard}
                  onClick={() => handleClick(item)}
                >
                  <div className={styles.tournamentRow}>
                    <div className={styles.tournamentDetails}>
                      <img src={item.logo || notFoundIcon.src} alt={"logo"} />
                      <div className={styles.tournamentName}>{item.name}</div>
                    </div>
                    <img
                      // @ts-ignore
                      src={imageMap[item.esportCode]?.src}
                      className={styles.esportIcon}
                    />
                    <img
                      className={styles.tournamentChevron}
                      src={chevronRightIcon.src}
                      alt=""
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col min-w-[384px] basis-[100%] lg:basis-[384px]">
          <PromoSideBanner sidebarLandingData={sidebarLandingData} />
        </div>
      </div>
    </div>
  );
};

export default TournamentsPage;
