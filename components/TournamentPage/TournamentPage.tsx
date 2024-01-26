"use client";
import Image from "next/image";
import csgoIcon from "public/icons/cs-go.svg";
import logo from "public/icons/logoNew.svg";
import ai from "public/icons/ai.svg";

import React, { FC, memo, useEffect, useState } from "react";
import cls from "classnames";

import "swiper/css";
import "swiper/scss/pagination";
import matchPageStyles from "@/components/MatchesPage/MatchesPage.module.scss";
import "./MatchPage.module.scss";

import { useRouter, useSearchParams } from "next/navigation";

import { GamesButtons } from "@/components/MatchesPage/components/GamesButtons";
import MatchList from "@/components/MatchesPage/components/MatchList/MatchList";
import { Tournaments } from "@/components/MatchesPage/components/Tournaments";
import { PromoSideBanner } from "@/components/MatchesPage/components/PromoSideBanner";
import { SwitchToggle } from "@/components/MatchesPage/components/Toggle";
import { Breadcrumbs } from "../Breadcrumbs";
import notFoundIcon from "public/icons/not-found.svg";

type PropsType = {
  data?: any;
  dataTournaments?: any;
  resultsData?: any;
  sidebarLandingData?: any;
};

const TournamentPage: FC<PropsType> = ({
  data,
  dataTournaments,
  resultsData,
  sidebarLandingData,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>("UPCOMING");
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();

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
  const leagueName = data?.[0]?.leagueName || "No league name";
  const leagueLogo = data?.[0]?.leagueLogo || notFoundIcon.src;
  return (
    <>
      <div>
        <div className={matchPageStyles.wrapper}>
          <Breadcrumbs
            current_item_heading={data?.[0]?.leagueName || "No league name"}
          />
          <div className={matchPageStyles.title}>
            <img
              className={matchPageStyles.leagueLogoTitle}
              src={leagueLogo}
              alt=""
            />
            {data?.[0]?.leagueName || "No league name"}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-[24px]">
          <div className="flex flex-col flex-grow">
            <div className={matchPageStyles.matchesFeedHeader}>
              <GamesButtons />
            </div>
            <div className={matchPageStyles.ai}>
              <div className={matchPageStyles.matchesFilter}>
                <div
                  className={cls(matchPageStyles.filterButton, {
                    [matchPageStyles.active]: activeFilter === "UPCOMING",
                  })}
                  onClick={() => {
                    handleFilterClick("UPCOMING");
                  }}
                >
                  Upcoming
                </div>
                <div
                  className={cls(matchPageStyles.filterButton, {
                    [matchPageStyles.active]: activeFilter === "RUNNING",
                  })}
                  onClick={() => {
                    handleFilterClick("RUNNING");
                  }}
                >
                  Live
                </div>
                <div
                  className={cls(matchPageStyles.filterButton, {
                    [matchPageStyles.active]: activeFilter === "PAST",
                  })}
                  onClick={() => {
                    handleFilterClick("PAST");
                  }}
                >
                  Results
                </div>
              </div>

              {activeFilter !== "PAST" ? (
                <div className={matchPageStyles.aiPredictionSwitchWrapper}>
                  <button
                    className={matchPageStyles.aiPredictionSwitchLabel}
                    onClick={() => {
                      setIsToggled(!isToggled);
                    }}
                  >
                    <Image src={ai} width={24} height={24} alt={"icon"} />
                    <p>AI predictions</p>
                  </button>
                  <SwitchToggle
                    setIsToggled={setIsToggled}
                    isToggled={isToggled}
                  />
                </div>
              ) : null}
            </div>

            <MatchList
              activeFilter={activeFilter}
              data={data}
              resultsData={resultsData}
              isPredictionToggled={isToggled}
            />
          </div>
          <div className="flex flex-col basis-[336px]">
            <Tournaments dataTournaments={dataTournaments} />
            <PromoSideBanner sidebarLandingData={sidebarLandingData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(TournamentPage);
