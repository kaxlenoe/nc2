import { IMatch, ITournamentTake } from "@/types/games";
import { SectionName } from "@/types/request-action";
import { getCSGOData, getDotaData, getLeagueData } from "@/utils/api";
import { games, matchStatuses } from "@/utils/constants";
import { getRightUTCDate, getUTCFormattedDate } from "@/utils/helpers";
import {
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQueries,
  useQueryClient,
} from "@tanstack/react-query";
import { addHours } from "date-fns";
import { useEffect, useRef } from "react";
import { useDebounce } from "use-debounce";

interface IGamesDataProps {
  game: SectionName;
  status: string;
  searchQuery: string;
  tournament: ITournamentTake | null;
  placeholder: {
    csgo: IMatch[] | null;
    dota: IMatch[] | null;
    lol: IMatch[] | null;
    allGames: IMatch[] | null;
  };
}

export interface IGamesDataResult {
  data: IMatch[];
  error: any;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage?: boolean;
  fetchNextPage: () => void;
}

const flattenData = (
  obj: UseInfiniteQueryResult<any, unknown>,
): IGamesDataResult => ({
  ...obj,
  data: obj.data?.pages
    ? // @ts-ignore
      obj.data?.pages.filter((f) => f).flatMap((d) => d.data) ?? []
    : Array.isArray(obj.data)
    ? obj.data
    : [],
});

const flattenDataAllGames = (
  objects: Array<{ data: { pages?: Array<{ data: any }> } }>,
): IGamesDataResult => {
  // Initialize an array to store the flattened data from each object
  const flattenedData = [];

  // Iterate through the array of objects and flatten the data
  for (const obj of objects) {
    if (obj.data?.pages) {
      const dataFromPages = obj.data.pages.map((page) => page?.data);
      flattenedData.push(...dataFromPages.flat());
    } else if (Array.isArray(obj.data)) {
      flattenedData.push(...obj.data);
    }
  }

  // Create a new object with the flattened data
  // @ts-ignore
  const result: IGamesDataResult = {
    ...objects[0], // Assuming the structure of the first object is representative
    data: flattenedData,
  };

  return result;
};

const dataToPlaceholderResult = (data: IMatch[] | null): IGamesDataResult => ({
  data: data ?? [],
  error: null,
  isLoading: false,
  isFetchingNextPage: false,
  hasNextPage: false,
  fetchNextPage: () => {},
});

/*
export const useGamesData = ({
  game,
  status,
  searchQuery,
  tournament,
  placeholder,
}: IGamesDataProps) => {
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const queryClient = useQueryClient();
  const prevGame = useRef(game);
  const prevStatus = useRef(status);
  const isFirstTime = useRef(true);

  const getNextPageParam = (prevData: any) => {
    if (!prevData) return 1;
    const { page, pageCount } = prevData.meta;
    return page < pageCount ? page + 1 : undefined;
  };
  const staleTime = 1000 * 5; // 5 seconds
  const cacheTime = debouncedSearchQuery || tournament?.id ? 0 : 1000 * 5;

  const isToday = true;
  const isUpcoming = status === matchStatuses.upcoming && matchStatuses.running;
  const enabledCsGo = isToday || game === games.csgo;
  const enabledDota2 = isToday || game === games.dota;
  const enabledLol = isToday || game === games.legends;

  const startDate = new Date();
  const endDate = addHours(startDate, 24);
  const beginDate = addHours(startDate, -24);

  const beginAtMin = getUTCFormattedDate(getRightUTCDate(beginDate));
  const beginAtMax =
    isToday && isUpcoming
      ? getUTCFormattedDate(getRightUTCDate(endDate))
      : undefined;

  const csgo = useInfiniteQuery({
    queryKey: ["matchesCSGO", isToday, debouncedSearchQuery, tournament?.id],
    queryFn: async ({ pageParam = 1 }) => {
      const csGoGames = await getCSGOData({
        beginAtMin,
        query: debouncedSearchQuery.trim(),
        leagueId: tournament?.id,
        // @ts-ignore
        page: pageParam,
      });
      isFirstTime.current = false;
      return csGoGames;
    },
    getNextPageParam,
    staleTime,
    cacheTime,
    enabled: enabledCsGo,
  });

  const dota2 = useInfiniteQuery({
    queryKey: ["matchesDota", isToday, debouncedSearchQuery, tournament?.id],
    queryFn: async ({ pageParam = 1 }) => {
      const dotaGames = await getDotaData({
        beginAtMin,
        query: debouncedSearchQuery.trim(),
        leagueId: tournament?.id,
        page: pageParam,
      });
      isFirstTime.current = false;
      return dotaGames;
    },
    getNextPageParam,
    staleTime,
    cacheTime,
    enabled: enabledDota2,
  });

  const lol = useInfiniteQuery({
    queryKey: ["matchesLeague", isToday, debouncedSearchQuery, tournament?.id],
    queryFn: async ({ pageParam = 1 }) => {
      const lolGames = await getLeagueData({
        beginAtMin,
        query: debouncedSearchQuery.trim(),
        leagueId: tournament?.id,
        page: pageParam,
      });
      isFirstTime.current = false;
      return lolGames;
    },
    getNextPageParam,
    staleTime,
    cacheTime,
    enabled: enabledLol,
  });

  const allGames: any = useQueries({
    queries: [
      {
        queryKey: [
          "matchesLeague",
          isToday,
          debouncedSearchQuery,
          tournament?.id,
        ],
        queryFn: async ({ pageParam = 1 }) => {
          const lolGames = await getLeagueData({
            beginAtMin,
            query: debouncedSearchQuery.trim(),
            leagueId: tournament?.id,
            page: pageParam,
          });
          isFirstTime.current = false;
          return lolGames;
        },
        getNextPageParam,
        staleTime,
        cacheTime,
        enabled: enabledLol,
      },
      {
        queryKey: [
          "matchesDota",
          isToday,
          debouncedSearchQuery,
          tournament?.id,
        ],
        queryFn: async ({ pageParam = 1 }) => {
          const dotaGames = await getDotaData({
            query: debouncedSearchQuery.trim(),
            leagueId: tournament?.id,
            page: pageParam,
          });
          isFirstTime.current = false;
          return dotaGames;
        },
        getNextPageParam,
        staleTime,
        cacheTime,
        enabled: enabledDota2,
      },
      {
        queryKey: [
          "matchesCSGO",
          isToday,
          debouncedSearchQuery,
          tournament?.id,
        ],
        queryFn: async ({ pageParam = 1 }) => {
          const csGoGames = await getCSGOData({
            query: debouncedSearchQuery.trim(),
            leagueId: tournament?.id,
            page: pageParam,
          });
          isFirstTime.current = false;
          return csGoGames;
        },
        getNextPageParam,
        staleTime,
        cacheTime,
        enabled: enabledCsGo,
      },
    ],
  });

  useEffect(() => {
    if (prevGame.current === game && prevStatus.current === status) return;
    prevGame.current = game;
    prevStatus.current = status;

    const resetToPage1 = (data: any) =>
      data && {
        pages: data.pages && data.pages.slice(0, 1),
        pageParams: data.pageParams && data.pageParams.slice(0, 1),
      };

    queryClient.setQueryData(
      ["matchesCSGO", debouncedSearchQuery],
      resetToPage1,
    );
    queryClient.setQueryData(
      ["matchesDota", debouncedSearchQuery],
      resetToPage1,
    );
    queryClient.setQueryData(
      ["matchesLeague", debouncedSearchQuery],
      resetToPage1,
    );
  }, [game, status]);

  const csgoHydrated =
    csgo.isLoading && isFirstTime.current
      ? dataToPlaceholderResult(placeholder.csgo)
      : flattenData(csgo);
  const dotaHydrated =
    dota2.isLoading && isFirstTime.current
      ? dataToPlaceholderResult(placeholder.dota)
      : flattenData(dota2);
  const lolHydrated =
    lol.isLoading && isFirstTime.current
      ? dataToPlaceholderResult(placeholder.lol)
      : flattenData(lol);

  const allGamesHydrated =
    allGames.isLoading && isFirstTime.current
      ? dataToPlaceholderResult(placeholder.allGames)
      : flattenDataAllGames(allGames);

  const obj: {
    csgo?: IGamesDataResult;
    dota2?: IGamesDataResult;
    lol?: IGamesDataResult;
    allGames?: any;
    loading: boolean;
  } = {
    loading:
      (enabledCsGo && csgoHydrated.isLoading) ||
      (enabledDota2 && dotaHydrated.isLoading) ||
      (enabledLol && lolHydrated.isLoading),
  };

  switch (game) {
    case games.csgo:
      obj.csgo = csgoHydrated;
      break;
    case games.dota:
      obj.dota2 = dotaHydrated;
      break;
    case games.legends:
      obj.lol = lolHydrated;
      break;
    case games.allGames:
      obj.allGames = allGamesHydrated;
    default:
      obj.csgo = csgoHydrated;
      obj.dota2 = dotaHydrated;
      obj.lol = lolHydrated;
      break;
  }

  return obj;
};
*/
