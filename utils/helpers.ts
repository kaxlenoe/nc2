import { games } from "@/constants";
import { IMatch, IOdd } from "@/types/games";
import {
  format,
  isToday,
  isTomorrow,
  isYesterday,
  parse,
  parseISO,
} from "date-fns";
import { IMatchStreamInfo } from "@/types/IMatchStreamInfo";
import { SPORTBOOKS_STATIC } from "@/constants/SportsbooksData";

export const getCorrectTime = (dateStr: string) => {
  const dateObj = new Date(dateStr);

  if (isNaN(dateObj.getTime())) {
    return;
  }

  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();

  const timeInHHMM = `${String(hours).padStart(2, "0")}:${String(
    minutes,
  ).padStart(2, "0")}`;
  return timeInHHMM;
};

export const getRightUTCDate = (date: Date) => {
  const offset = date.getTimezoneOffset() * 60 * 1000;
  return new Date(date.getTime() + offset);
};

export const getUTCFormattedDate = (date: Date) => {
  const el = {
    year: date.getFullYear(),
    month: String(date.getMonth() + 1).padStart(2, "0"),
    day: String(date.getDate()).padStart(2, "0"),
    hours: String(date.getHours()).padStart(2, "0"),
    minutes: String(date.getMinutes()).padStart(2, "0"),
    seconds: String(date.getSeconds()).padStart(2, "0"),
  };

  return `${el.year}-${el.month}-${el.day}T${el.hours}:${el.minutes}:${el.seconds}.000Z`;
};

export const parseTimer = (time: number, isSeconds: boolean = true) => {
  const days = Math.floor(time / (24 * 60 * 60 * 1000));
  const daysms = time % (24 * 60 * 60 * 1000);
  const hours = Math.floor(daysms / (60 * 60 * 1000));
  const hoursms = time % (60 * 60 * 1000);
  const minutes = Math.floor(hoursms / (60 * 1000));
  const minutesms = time % (60 * 1000);
  const sec = Math.floor(minutesms / 1000);
  return days
    ? isSeconds
      ? `${days}D : ${hours}H : ${minutes}M : ${sec}S`
      : `${days}D : ${hours}H : ${minutes}M`
    : isSeconds
    ? `${hours}H : ${minutes}M : ${sec}S`
    : `${hours}H : ${minutes}M`;
};
export const getDistanceFromNow = (time: string) =>
  Date.parse(time) - Date.now();

export const getMatchResult = (match: IMatch) => {
  let team1WinnerCount = 0;
  let team2WinnerCount = 0;
  const team1 = match?.games?.[0]?.teams?.[0]?.name;
  const team2 = match?.games?.[0]?.teams?.[1]?.name;
  match?.games?.forEach((game) => {
    if (game.winner === team1) team1WinnerCount += 1;
    if (game.winner === team2) team2WinnerCount += 1;
  });
  return [team1WinnerCount, team2WinnerCount];
};

export const getFirstLetterFromEachWord = (str: string) => {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => word[0])
    .join("");
};

export const toPercentage = (num: number) => Math.round(num * 100);

export const priceToString = (price: any) => {
  if (price === undefined || price === null || price === -Infinity) return "—";

  if (typeof price === "string") return price;

  const isInteger = price % 1 === 0;
  const priceStr = isInteger ? price + ".00" : price.toFixed(2);

  return isNaN(priceStr) ? undefined : priceStr;
};

export const getTime = (date: Date) => {
  return (
    (date.getHours() < 10 ? "0" : "") +
    date.getHours() +
    ":" +
    (date.getMinutes() < 10 ? "0" : "") +
    date.getMinutes()
  );
};

export const getDate = (date: Date) => {
  return format(date, "M.dd.yy");
};

export const formatNumber = (num: any, precision: number = 2) => {
  if (typeof num !== "number") return num;
  if (num < 1000) return String(num);

  const suffixes = ["", "k", "m", "b", "t"];
  const suffixNum = Math.max(
    Math.floor((String(Math.round(num)).length - 1) / 3),
    0,
  );
  let shortValue: any = parseFloat(
    (suffixNum !== 0 ? num / Math.pow(1000, suffixNum) : num).toPrecision(
      precision,
    ),
  );
  return shortValue + suffixes[suffixNum];
};

export const getGameData = (name: string) => {
  if (name === games.csgo) return "CS:GO";
  if (name === games.dota) return "Dota 2";
  if (name === games.legends) return "League of Legends";
};

export const isNullable = (value: any) => value === null || value === undefined;

export const updateQuery = (push: any, pathname: any, query: any) => {
  push({ pathname, query }, undefined, { shallow: true });
};
export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export const getTodayString = (
  dateStr: string,
  fromResults?: boolean,
  isExtended?: boolean,
  shortFormat?: boolean,
) => {
  if (fromResults) {
    try {
      const dateWithNewFormat = parseISO(dateStr);

      if (isYesterday(dateWithNewFormat)) {
        return isExtended
          ? `Yesterday, ${format(dateWithNewFormat, "MMMM d")}`
          : `Yesterday`;
      }

      if (isToday(dateWithNewFormat)) {
        return isExtended
          ? `Today, ${format(dateWithNewFormat, "MMMM d")}`
          : `Today`;
      }

      if (isTomorrow(dateWithNewFormat)) {
        return isExtended
          ? `Tomorrow, ${format(dateWithNewFormat, "MMMM d")}`
          : `Tomorrow`;
      }

      if (!isNaN(dateWithNewFormat.getTime())) {
        return `${format(dateWithNewFormat, "MMMM d")}`;
      }

      throw new Error("Invalid date format");
    } catch (error) {
      return "";
    }
  } else if (shortFormat) {
    try {
      const oldFormatDate = parse(dateStr, "EEE L/d/y", new Date());
      const newFormatDate = parse(dateStr, "yyyy-MM-dd", new Date());

      const formatDate = (date: Date) => format(date, "MMM d");

      if (isYesterday(oldFormatDate) || isYesterday(newFormatDate)) {
        return isExtended
          ? `Yesterday, ${formatDate(oldFormatDate)}`
          : "Yesterday";
      }

      if (isToday(oldFormatDate) || isToday(newFormatDate)) {
        return isExtended ? `Today, ${formatDate(oldFormatDate)}` : "Today";
      }

      if (isTomorrow(oldFormatDate) || isTomorrow(newFormatDate)) {
        return isExtended
          ? `Tomorrow, ${formatDate(oldFormatDate)}`
          : "Tomorrow";
      }

      const validDate = !isNaN(oldFormatDate.getTime())
        ? oldFormatDate
        : !isNaN(newFormatDate.getTime())
        ? newFormatDate
        : null;
      if (validDate) {
        return formatDate(validDate);
      }

      throw new Error("Invalid date format");
    } catch (error) {
      return "";
    }
  } else {
    try {
      const dateWithOldFormat = parse(dateStr, "EEE L/d/y", new Date());
      const dateWithNewFormat = parse(dateStr, "yyyy-MM-dd", new Date());

      if (isYesterday(dateWithOldFormat)) {
        return isExtended
          ? `Yesterday, ${format(dateWithOldFormat, "MMMM d")} `
          : `Yesterday`;
      }

      if (isToday(dateWithOldFormat)) {
        return isExtended
          ? `Today, ${format(dateWithOldFormat, "MMMM d")} `
          : `Today`;
      }

      if (isTomorrow(dateWithOldFormat)) {
        return isExtended
          ? `Tomorrow, ${format(dateWithOldFormat, "MMMM d")} `
          : `Tomorrow`;
      }

      if (!isNaN(dateWithOldFormat.getTime())) {
        return `${format(dateWithOldFormat, "MMMM d")}, ${format(
          dateWithOldFormat,
          "yyyy",
        )}`;
      }

      if (isYesterday(dateWithNewFormat)) {
        return isExtended
          ? `Yesterday, ${format(dateWithNewFormat, "MMMM d")} `
          : `Yesterday`;
      }

      if (isToday(dateWithNewFormat)) {
        return isExtended
          ? `Today, ${format(dateWithNewFormat, "MMMM d")} `
          : `Today`;
      }

      if (isTomorrow(dateWithNewFormat)) {
        return isExtended
          ? `Tomorrow, ${format(dateWithNewFormat, "MMMM d")} `
          : `Tomorrow`;
      }

      if (!isNaN(dateWithNewFormat.getTime())) {
        return format(dateWithNewFormat, "MMMM d");
      }

      throw new Error("Invalid date format");
    } catch (error) {
      return "";
    }
  }
};

export const getUniqueTournaments = (
  game: string,
  allGames: any,
  csGo: any,
  dota: any,
  lol: any,
) => {
  const tournamentData = games.allGames
    ? allGames
    : game === games.csgo
    ? csGo
    : game === games.dota
    ? dota
    : lol;

  if (!tournamentData) return [];

  // Use reduce to create a map of unique tournaments with their counts
  const tournamentsMap = tournamentData.reduce(
    (acc: any, item: { leagueId: any; leagueName: any; leagueLogo: any }) => {
      // Safely extract leagueId, leagueName, and leagueLogo, with defaults if undefined
      const { leagueId, leagueName, leagueLogo } = item;

      if (leagueId) {
        // @ts-ignore
        if (!acc[leagueId]) {
          // @ts-ignore
          acc[leagueId] = {
            id: leagueId,
            name: leagueName,
            logo: leagueLogo,
            count: 1,
          };
        } else {
          // @ts-ignore
          acc[leagueId].count += 1;
        }
      }
      return acc;
    },
    {},
  );

  const uniqueTournamentsList = Object.values(tournamentsMap);

  return uniqueTournamentsList;
};

export const formatDate = (date: string | number | Date) => {
  if (date && date !== "undefined") {
    return format(new Date(date), "EEE L/d/y");
  } else {
    return "Unknown date";
  }
};

export const findObjectByKey = (
  array: IPageStaticString[] | IMatchStreamInfo[],
  key: string,
  value: string,
): IPageStaticString | IMatchStreamInfo | undefined => {
  return (
    // @ts-ignore
    array?.find((item: { [x: string]: string }) => item[key] === value) ||
    undefined
  );
};

export const findActualStream = (
  streams_list: IMatchStreamInfo[],
  lang: string,
): IPageStaticString | IMatchStreamInfo | undefined => {
  return (
    streams_list?.find((item) => item["language"] === lang) ||
    streams_list?.find((item) => item["main"]) ||
    undefined
  );
};
export const openInNewTab = (url: string) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};
export const lightenHexColor = (hex: string, percent: number) => {
  // Ensure the percent is between 0 and 100
  percent = Math.min(100, Math.max(0, percent));

  // Convert hex to RGB
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);

  // Calculate the adjustment value
  let adjust = (percent / 100) * 255;

  // Increase each component by the adjustment value
  r = Math.min(255, r + adjust);
  g = Math.min(255, g + adjust);
  b = Math.min(255, b + adjust);

  // Convert back to hex and return
  return `#${Math.round(r).toString(16).padStart(2, "0")}${Math.round(g)
    .toString(16)
    .padStart(2, "0")}${Math.round(b).toString(16).padStart(2, "0")}`;
};

export const removeSpaces = (str: string) => {
  return str.replace(/\s+/g, "-");
};

export const getCorrectUrlForSportbook = (
  matchUrl: string,
  provider: string,
) => {
  if (provider === "thunderpick") {
    return `${matchUrl}?utm_source=referral&utm_medium=referral&utm_campaign=CHEESY`;
  }
  return matchUrl;
};

export const calculateWinRate = (
  matches: [
    {
      teamAName: string;
      teamBName: string;
      winner: string;
    },
  ],
  team_name: string,
): [number, number, number] => {
  let wins = 0;
  let looses = 0;
  let totalMatches = 0;
  let winRate = 0;

  matches?.forEach((match) => {
    // Check if the team participated in the match
    if (match.teamAName === team_name || match.teamBName === team_name) {
      totalMatches++;
      if (match.winner === team_name) {
        wins++;
      } else {
        looses++;
      }
    }
  });
  if (totalMatches > 0) {
    let winRateString: string = ((wins / totalMatches) * 100).toFixed(0);
    winRate = Number(winRateString);
  }
  return [wins, looses, winRate];
};

// Function to replace all variable occurrences in a string
export const replaceVariablesInText = (
  str: string,
  variables: { [key: string]: any },
) => {
  return Object.keys(variables).reduce((acc, variable) => {
    return acc.replace(new RegExp(variable, "g"), variables[variable]);
  }, str);
};

export const getIdFromSlug = (slug: string) => {
  const pathSegments = slug.split("-");
  return pathSegments[pathSegments.length - 1];
};

export const getCorrectProviderUrl = (
  provider: string,
  matchUrl: string,
): string => {
  let modifiedUrl = matchUrl || SPORTBOOKS_STATIC[provider]?.link;
  if (provider === "thunderpick") {
    modifiedUrl = `${matchUrl}?utm_source=cellxpert&utm_medium=cellxpert&utm_campaign=dd1e02a3-6256-4e8d-9752-5c405a88fce9&cxd=35614_413142`;
  }
  return modifiedUrl;
};
export const extractBestPickedOdd = (data: IMatch, pathKey: string) => {
  //@ts-ignore
  let bestOdd: IOdd = {
    provider: "",
    // @ts-ignore
    winner: { home: 0, away: 0 },
    homeName: "",
    awayName: "",
  };
  let bestOddValue = 0;
  let teamName = "";
  let teamLogo = null;
  let pathType = "";
  let diffPercentage = 0;

  data.picks.forEach((pick) => {
    pick.paths.forEach((path) => {
      if (path.type === pathKey) {
        //@ts-ignore
        const oddValue = pick.odd.winner[path.outcome];
        if (oddValue > bestOddValue) {
          bestOddValue = oddValue;
          bestOdd = pick.odd;
          teamName =
            path.outcome === "home" ? bestOdd.homeName : bestOdd.awayName;
          teamLogo =
            path.outcome === "home"
              ? data.games[0].teams[0].logo
              : data.games[0].teams[1].logo;
          pathType = path.type;
          diffPercentage = path.diffPercentage;
        }
      }
    });
  });

  if (bestOddValue) {
    return {
      value: bestOddValue,
      provider: bestOdd.provider,
      teamName,
      teamLogo,
      pathType,
      diffPercentage,
      matchUrl: bestOdd.matchUrl,
    };
  }

  return false;
};
export const isRootPage = (pathname:string, page:string) => pathname === `/${page}`;
export const determineHrefForGamesButtons = ( pathname: string, gameSlug: string ) => {
    if ( pathname.includes( '/matches' ) ) {
        return `/matches/${ gameSlug }`;
    }
    else if ( pathname.includes( '/tournaments' ) ) {
        return `/tournaments/${ gameSlug }`;
    }
    else if ( pathname.includes( '/picks' ) ) {
        return `/picks/${ gameSlug }`;
    }
    return `/matches/${ gameSlug }`; // Default href is for matches as in root layout games buttons leads to matches
}