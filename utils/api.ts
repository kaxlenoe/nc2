import { matchStatuses } from '@/constants';
import { IAction, IRequestParams } from '@/types/request-action';
import axios from 'axios';

const BASE_URL = 'https://s1.neoncheese.com/api/v1';

const axiosPublic = axios.create();

export const apiHelperPublic = async ( action: IAction ) => {
    let config = {
        baseURL: BASE_URL,
        url: action.url,
        method: action.method || 'get',
        data: action.data || {},
        params: action.query || {},
        timeout: action.timeout || 20000,
        paramsSerializer: {
            indexes: null,
        },
    };

    try {
        const response = await axiosPublic( config );
        return response.data;
    }
    catch ( error: any ) {
        let message;
        // console.log({ error });
        // if (error instanceof AxiosError)
        message =
            error?.message ||
            error?.response?.data?.message ||
            'Something went wrong';
        // throw new Error(message);
    }
};

//cs:go requests

export const getCSGOData = async ( {
    page = 1,
    take = 150,
    order,
    query,
    leagueId,
    beginAtMin,
    beginAtMax,
    status,
}: IRequestParams ) => {
    const gameData = await apiHelperPublic( {
        url: 'matches-csgo',
        query: {
            page: page,
            take: take,
            status: status || [ matchStatuses.running, matchStatuses.upcoming ],
            order: order || 'ASC',
            query,
            leagueId,
            beginAtMin,
            beginAtMax,
        },
    } );

    return gameData;
};

export const getCSGOMatchById = async ( id: string | number ) => {
    const matchData = await apiHelperPublic( {
        url: `matches-csgo/${ id }`,
    } );
    return matchData;
};

export const getCSGOTournaments = async () => {
    const tournaments = await apiHelperPublic( {
        url: 'matches-csgo/leagues',
        query: {
            take: 20,
            status: [ matchStatuses.running, matchStatuses.upcoming ],
        },
    } );
    return tournaments;
};
export const getCSGOPicks = async () => {
    const picks = await apiHelperPublic( {
        url: 'matches-csgo/trend-picks',
        query: {
            minDiff: 2,
            maxOdd: 2.75,
            take: 20,
        },
    } );
    return picks;
};

export const getDotaPicks = async () => {
    const picks = await apiHelperPublic( {
        url: 'matches-dota2/trend-picks',
        query: {
            minDiff: 2,
            maxOdd: 2.75,
            take: 20,
        },
    } );
    return picks;
};
export const getLOLPicks = async () => {
    const picks = await apiHelperPublic( {
        url: 'matches-lol/trend-picks',
        query: {
            minDiff: 2,
            maxOdd: 2.75,
            take: 20,
        },
    } );
    return picks;
};

export const getCSGOOtherMatches = async ( id: string | number ) => {
    const otherMatches = await apiHelperPublic( {
        url: `matches-csgo/random/${ id }`,
    } );
    return otherMatches;
};

export const getDotaData = async ( {
    page = 1,
    take = 100,
    status,
    order,
    query,
    leagueId,
    beginAtMin,
    beginAtMax,
}: IRequestParams ) => {
    const gameData = await apiHelperPublic( {
        url: 'matches-dota2',
        query: {
            page: page,
            take: take,
            status: status || [ matchStatuses.running, matchStatuses.upcoming ],
            order: order || 'ASC',
            query,
            leagueId,
            beginAtMin,
            beginAtMax,
        },
    } );

    return gameData;
};

export const getDotaMatchById = async ( id: string | number ) => {
    const matchData = await apiHelperPublic( {
        url: `matches-dota2/${ id }`,
    } );
    return matchData;
};

export const getDotaTournaments = async () => {
    const tournaments = await apiHelperPublic( {
        url: 'matches-dota2/leagues',
        query: {
            take: 20,
            status: [ matchStatuses.running, matchStatuses.upcoming ],
        },
    } );
    return tournaments;
};

export const getDotaOtherMatches = async ( id: string | number ) => {
    const otherMatches = await apiHelperPublic( {
        url: `matches-dota2/random/${ id }`,
    } );
    return otherMatches;
};

//league of legends requests

export const getLeagueData = async ( {
    page = 1,
    take = 150, // Adjusted default value to match getCSGOData
    order,
    query,
    leagueId,
    beginAtMin,
    beginAtMax,
    status, // Moved the status parameter to the end to match the structure of getCSGOData
}: IRequestParams ) => {
    const gameData = await apiHelperPublic( {
        url: 'matches-lol',
        query: {
            page: page,
            take: take,
            status: status || [ matchStatuses.running, matchStatuses.upcoming ],
            order: order || 'ASC',
            query,
            leagueId,
            beginAtMin,
            beginAtMax,
        },
    } );

    return gameData;
};

export const getLolMatchById = async ( id: string | number ) => {
    const matchData = await apiHelperPublic( {
        url: `matches-lol/${ id }`,
    } );
    return matchData;
};

export const getLoLTournaments = async () => {
    const tournaments = await apiHelperPublic( {
        url: 'matches-lol/leagues',
        query: {
            take: 20,
            status: [ matchStatuses.running, matchStatuses.upcoming ],
        },
    } );
    return tournaments;
};

export const getLoLOtherMatches = async ( id: string | number ) => {
    const otherMatches = await apiHelperPublic( {
        url: `matches-lol/random/${ id }`,
    } );
    return otherMatches;
};

export const getCsGoGameByTournamentByID = async (
    id: string | number,
    status: string[] = [ matchStatuses.running, matchStatuses.upcoming ],
    order: string = '',
) => {
    const tournaments = await apiHelperPublic( {
        url: `matches-csgo/leagues/${ id }`,
        query: {
            take: 20,
            status: status,
            order: order,
        },
    } );
    return tournaments;
};
export const getDotaGameByTournamentByID = async (
    id: string | number,
    status: string[] = [ matchStatuses.running, matchStatuses.upcoming ],
    order: string = '',
) => {
    const tournaments = await apiHelperPublic( {
        url: `matches-dota2/leagues/${ id }`,
        query: {
            take: 20,
            status: status,
            order: order,
        },
    } );
    return tournaments;
};

export const getLolGameTournamentByID = async (
    id: string | number,
    status: string[] = [ matchStatuses.running, matchStatuses.upcoming ],
    order: string = '',
) => {
    const tournaments = await apiHelperPublic( {
        url: `matches-lol/leagues/${ id }`,
        query: {
            take: 20,
            status: status,
            order: order,
        },
    } );
    return tournaments;
};
