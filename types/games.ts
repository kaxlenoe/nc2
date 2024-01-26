export interface IGameCSGOPayload {
  data: IGameCSGO[];
  meta: {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

export enum IStatsTypes {
  RAW = "raw",
  ADJUSTED = "adjusted",
}

export interface ITeamCSGO {
  cTRoundsPlayed: number;
  cTRoundsWon: number;
  firstRoundWon: number;
  heroBans: number[];
  heroPicks: number[];
  teamId: number;
  id: number;
  logo: string;
  name: string;
  players: IPlayerCSGO[];
  roundsScore: number;
  sixteenRoundWon: boolean;
  tRoundsPlayed: number;
  tRoundsWon: number;
  stats?: any;
}

export interface ITeamDota2 {
  firstBlood: boolean;
  firstRoshan: boolean;
  firstTower: boolean;
  heroBans: number[];
  heroPicks: number[];
  teamId: number;
  id: number;
  logo: string;
  name: string;
  players: IPlayerDota2[];
  score: number;
  stats?: any;
}

export interface ITeamLol {
  baronKills: number;
  dragonKills: number;
  firstBaron: boolean;
  firstBlood: boolean;
  firstDragon: boolean;
  firstHerald: boolean;
  firstInhibitor: boolean;
  firstTower: boolean;
  goldEarned: number;
  heroBans: number[];
  heroPicks: [];
  teamId: number;
  id: number;
  kills: number;
  logo: string;
  name: string;
  players: IPlayerLol[];
  towerKills: number;
  stats?: any;
}

export interface IPlayerCSGO {
  assists: number;
  deaths: number;
  firstKillsDifferences: number;
  headshots: number;
  id: number;
  kast: string;
  kills: number;
  rating: string;
}

export interface IPlayerDota2 {
  assists: number;
  creepsStacked: number;
  damageTaken: null;
  deaths: number;
  denies: number;
  goldPerMin: number;
  goldSpent: number;
  heal: number;
  heroDamage: number;
  heroLevel: number;
  id: number;
  kills: number;
  laneCreep: number;
  lastHits: number;
  observerUsed: number;
  observerWardsDestroyed: number;
  observerWardsPurchased: number;
  sentryWardsPurchased: number;
  sentryWardsUsed: number;
  towerKills: number;
  xpPerMin: number;
}

export interface IPlayerLol {
  assists: number;
  creepScore: number;
  goldSpent: number;
  id: number;
  totalCrowdControlDealt: number;
  totalDamageDealt: number;
  totalDamageDealtToHeroes: number;
  totalDamageTaken: number;
  totalHeal: number;
  totalLevels: number;
  wardsPlaced: number;
}

export interface IGame {
  gameBegin: string;
  gameEnd: string;
  id: number;
  gameLength?: number;
  map: {
    id: number;
    image_url: string;
    name: string;
  };
  winner: string;
  teams: ITeamCSGO[] | ITeamDota2[] | ITeamLol[];
  players: IGamePlayer[];
  status?: string;
  tournamentName?: string;
  matchId: number;
  numberOfGames?: number;
}

export interface IGamePlayer {
  name: string;
  surname: string;
  nickName: string;
  avatar: string;
  nationality: string;
  playerId: number;
  teamId: number;
  stats: IPlayerCSGO | IPlayerDota2 | IPlayerLol;
}

export interface ISelection {
  maxStake: number;
  minStake: number;
  outcome: string;
  params: string;
  price: number;
  probability: number;
  side: string;
  status: string;
}

export interface IOdd {
  awayName: string;
  homeName: string;
  id: number;
  oddId: number;
  provider?: string;
  winner: null | {
    submarkets: {
      "period=default": {
        selections: ISelection[];
      };
    };
  };
  totalMaps: null | {
    submarkets: {
      "period=default": {
        selections: ISelection[];
      };
    };
  };
  mapHandicap: null | {
    submarkets: {
      "period=default": {
        selections: ISelection[];
      };
    };
  };
  matchUrl?: string;
}

export type SelectionBetsMap = {
  [key: string]: ISelection[] | undefined;
};

export interface IMapStats {
  map: string;
  value: number;
  map_id: number;
  number: number;
  map_logo?: string;
}

export interface IWinStats {
  raw_a?: number;
  raw_b?: number;
  adjusted_a: number;
  adjusted_b?: number;
  map_adjusted_b: IMapStats[];
  map_adjusted_a: IMapStats[];
  map_raw_a: IMapStats[];
  map_raw_b: IMapStats[];
  total_matches_a?: number;
  total_matches_b?: number;
  total_match_wins_a?: number;
  total_match_wins_b?: number;
  total_match_lose_b?: number;
  total_match_lose_a?: number;
}

interface IStream {
  main: boolean;
  raw_url: string;
  language: string;
  official: boolean;
  embed_url: string;
}
export interface IPick {
  odd: IOdd;
  paths: IPickPath[];
}

export interface IPickPath {
  type: string;
  outcome: string;
  diffPercentage: number;
}
export interface IMatch {
  winner?: string;
  beginAt: string;
  games: IGame[];
  id: number;
  matchBegin: string;
  matchEnd: string;
  matchType: string;
  numberOfGames: number;
  serieId: number;
  serieWinner: null;
  status: string;
  tier: string;
  tournamentName: string;
  leagueName: string;
  leagueId: number;
  leagueLogo?: string | null;
  odds: IOdd[];
  probTeamA?: number | null;
  probTeamB?: number | null;
  probTie?: number | null;
  aMatches?: IMatch[];
  bMatches?: IMatch[];
  h2hMatches?: IMatch[];
  winStats?: IWinStats;
  gameName: string;
  scheduledAt: string;
  esportCode: string;
  endAt: string;
  teamBName: string;
  teamAName: string;
  teams: ITeamCSGO[] | ITeamDota2[] | ITeamLol[];
  streamsList: IStream[];
  picks:IPick[];
}


export interface IGameCSGO extends IGame {
  teamsCsGo: ITeamCSGO[];
  playersCsGo: IPlayerCSGO[];
}

export interface IGameDota2 extends IGame {
  teamsDota2: ITeamDota2[];
  playersDota2: IPlayerDota2[];
}

export interface IGameLol extends IGame {
  teamsLoL: ITeamLol[];
  playersLoL: IPlayerLol[];
}

export interface ITournament {
  id: string;
  name: string;
  logo?: string | null;
  count: string;
}

export interface ITournamentTake {
  id: string;
  take: number;
  name: string;
}
