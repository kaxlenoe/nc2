import onexbeticon from "public/icons/bets/1xbet-logo.jpeg";
import twentybeticon from "public/icons/bets/20bet.png";
import betWayBetLogo from "public/icons/bets/bet-way-logo.jpeg";
import cloudbetIcon from "public/icons/bets/cloudbet-logo.svg";
import thunderpickLogo from "public/icons/bets/thunderpick-logo.png";
import unibeticon from "public/icons/bets/unibet.svg";
import vaveBetLogo from "public/icons/bets/vave.svg";
import vBetLogo from "public/icons/bets/vbet.svg";
import { betsList } from "@/utils/constants";
import { SPORTBOOKS_STATIC } from "@/constants/SportsbooksData";

export const getCorrectOddData = (item: any) => {
  const cloudbetData = item?.odds.find(
    (item: { provider: string }) => item.provider === "cloudbet",
  );
  const thunderpickData = item?.odds.find(
    (item: { provider: string }) => item.provider === "thunderpick",
  );

  const lootbetData = item?.odds.find(
    (item: { provider: string }) => item.provider === "lootbet",
  );

  const nitrobettingData = item?.odds.find(
    (item: { provider: string }) => item.provider === "nitrobetting",
  );

  const melbetData = item?.odds.find(
    (item: { provider: string }) => item.provider === "melbet",
  );

  const x1betData = item?.odds.find(
    (item: { provider: string }) => item.provider === "x1bet",
  );

  const ggbetData = item?.odds.find(
    (item: { provider: string }) => item.provider === "ggbet",
  );

  let filteredOdds: any[] = [];

  const combinedPrices = (providerName: string) => {
    if (providerName === "cloudbet") {
      if (!cloudbetData) return;

      const away = cloudbetData.winner?.["away"];
      const draw = cloudbetData.winner?.["draw"];
      const home = cloudbetData?.winner?.["home"];
      return {
        away,
        home,
        draw,
        bookie_name: "cloudbet",
        link: cloudbetData?.matchUrl || SPORTBOOKS_STATIC["cloudbet"].link,
      };
    }
    if (providerName === "thunderpick") {
      if (!thunderpickData) return;

      const away = thunderpickData.winner["away"];
      const draw = thunderpickData.winner["draw"];
      const home = thunderpickData?.winner["home"];

      return {
        away,
        home,
        draw,
        bookie_name: "thunderpick",
        link: thunderpickData.matchUrl
          ? `${thunderpickData.matchUrl}?utm_source=cellxpert&utm_medium=cellxpert&utm_campaign=dd1e02a3-6256-4e8d-9752-5c405a88fce9&cxd=35614_413142`
          : SPORTBOOKS_STATIC["thunderpick"].link,
      };
    }
    if (providerName === "lootbet") {
      if (!lootbetData) return;

      const away = lootbetData?.winner["away"];
      const draw = lootbetData?.winner["draw"];
      const home = lootbetData?.winner["home"];

      return {
        away,
        home,
        draw,
        bookie_name: "lootbet",
        link: lootbetData.matchUrl || SPORTBOOKS_STATIC["lootbet"].link,
      };
    }
    if (providerName === "nitrobetting") {
      if (!nitrobettingData) return;

      const away = nitrobettingData?.winner["away"];
      const draw = nitrobettingData?.winner["draw"];
      const home = nitrobettingData?.winner["home"];

      return {
        away,
        home,
        draw,
        bookie_name: "nitrobetting",
        link:
          nitrobettingData.matchUrl || SPORTBOOKS_STATIC["nitrobetting"].link,
      };
    }
    if (providerName === "melbet") {
      if (!melbetData) return;

      const away = melbetData?.winner["away"];
      const draw = melbetData?.winner["draw"];
      const home = melbetData?.winner["home"];

      return {
        away,
        home,
        draw,
        bookie_name: "melbet",
        link: melbetData.matchUrl || SPORTBOOKS_STATIC["melbet"].link,
      };
    }

    if (providerName === "x1bet") {
      if (!x1betData) return;

      const away = x1betData?.winner["away"];
      const draw = x1betData?.winner["draw"];
      const home = x1betData?.winner["home"];

      return {
        away,
        home,
        draw,
        bookie_name: "x1bet",
        link: x1betData?.matchUrl || SPORTBOOKS_STATIC["x1bet"].link,
      };
    }

    if (providerName === "ggbet") {
      if (!ggbetData) return;

      const away = ggbetData?.winner["away"];
      const draw = ggbetData?.winner["draw"];
      const home = ggbetData?.winner["home"];

      return {
        away,
        home,
        draw,
        bookie_name: "ggbet",
        link: ggbetData?.matchUrl || SPORTBOOKS_STATIC["ggbet"].link,
      };
    }
  };

  filteredOdds.push(combinedPrices("cloudbet"));
  filteredOdds.push(combinedPrices("thunderpick"));
  filteredOdds.push(combinedPrices("nitrobetting"));
  filteredOdds.push(combinedPrices("lootbet"));
  filteredOdds.push(combinedPrices("melbet"));
  filteredOdds.push(combinedPrices("x1bet"));
  filteredOdds.push(combinedPrices("ggbet"));

  return filteredOdds;
};

export const findMaxValuesWithNames = (arrayOfObjects: any[]) => {
  const homeOddsWithName = arrayOfObjects.map((item) => ({
    home: typeof item?.home === "string" ? Number(item?.home) : item?.home,
    bookie_name: item?.bookie_name,
    link: item?.link,
  }));

  const drawOddsWithName = arrayOfObjects.map((item) => ({
    home: typeof item?.draw === "string" ? Number(item?.draw) : item?.draw,
    bookie_name: item?.bookie_name,
    link: item?.link,
    draw: undefined,
  }));

  const awayOddsWithName = arrayOfObjects.map((item) => ({
    away: typeof item?.away === "string" ? Number(item?.away) : item?.away,
    bookie_name: item?.bookie_name,
    link: item?.link,
  }));

  let maxHome = Number.NEGATIVE_INFINITY;
  let maxHomeName = null;
  let maxHomeUrl = "";

  let maxDraw = Number.NEGATIVE_INFINITY;
  let maxDrawName = "";
  let maxDrawUrl = "";

  let maxAway = Number.NEGATIVE_INFINITY;
  let maxAwayName = null;
  let maxAwayUrl = "";

  homeOddsWithName.forEach((item) => {
    if (
      typeof item.home === ("number" || "string") &&
      !isNaN(item.home) &&
      item.home > maxHome
    ) {
      maxHome = item.home;
      maxHomeName = item.bookie_name;
      maxHomeUrl = item?.link;
    }
  });

  drawOddsWithName.forEach((item) => {
    if (
      typeof item.draw === ("number" || "string") &&
      // @ts-ignore
      !isNaN(item.draw) &&
      // @ts-ignore
      item.draw > maxDraw
    ) {
      // @ts-ignore
      maxDraw = item.draw;
      maxDrawName = item.bookie_name;
      maxDrawUrl = item?.link;
    }
  });

  awayOddsWithName.forEach((item) => {
    if (
      typeof item.away === ("number" || "string") &&
      !isNaN(item.away) &&
      item.away > maxAway
    ) {
      maxAway = item.away;
      maxAwayName = item.bookie_name;
      maxAwayUrl = item?.link;
    }
  });

  const result = {
    maxHome,
    maxAway,
    maxDraw,
    maxHomeName,
    maxAwayName,
    maxDrawName,
    maxHomeUrl,
    maxAwayUrl,
    maxDrawUrl,
  };

  return result;
};
