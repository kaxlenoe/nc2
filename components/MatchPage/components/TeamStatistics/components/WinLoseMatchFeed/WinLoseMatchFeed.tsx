import React, { FC } from 'react';
import styles from './WinLoseMatchFeed.module.scss';
import { IGame, IMatch } from '@/types/games';
import { formatDate, getCorrectTime, getTodayString } from '@/utils/helpers';
import { ESPORTS_SLUG_BY_CODE } from '@/constants/EsportCodes';
import { notFoundIcon } from '@/constants/StaticIcons';

type PropsType = {
    last_matches?: IMatch[];
    team_name?: string;
};

const getMatchScoreByGames = ( games: IGame[] | undefined, current_team: string | undefined ) => {
    let current_team_score = 0;
    let opponent_team_score = 0;
    games?.map( ( game ) => {
        game.winner === current_team ? current_team_score++ : opponent_team_score++;
    } )
    return [ current_team_score, opponent_team_score ];
}

const WinLoseMatchFeed: FC<PropsType> = ( { last_matches, team_name } ) => {

    return (
        <div className={ styles.wrapper }>
            { last_matches && last_matches.length > 0 ? last_matches?.map( ( match, index ) => {
                let matchScore = getMatchScoreByGames( match.games, team_name );
                let formattedDate = formatDate( match.beginAt );
                let currentTeamLogo = match.games[ 0 ].teams[ 0 ].name === team_name ? match.games[ 0 ].teams[ 0 ].logo : match.games[ 0 ].teams[ 1 ].logo;
                let opponentTeamLogo = match.games[ 0 ].teams[ 0 ].name === team_name ? match.games[ 0 ].teams[ 1 ].logo : match.games[ 0 ].teams[ 0 ].logo;
                let opponentTeamName = match.games[ 0 ].teams[ 0 ].name === team_name ? match.games[ 0 ].teams[ 1 ].name : match.games[ 0 ].teams[ 0 ].name;
                let currentTeamApiName = match.games[ 0 ].teams[ 0 ].name === team_name ? match.games[ 0 ].teams[ 0 ].name : match.games[ 0 ].teams[ 1 ].name;
                // @ts-ignore
                let matchHref = `/matches/${ ESPORTS_SLUG_BY_CODE[ match.esportCode ] }/${ match.id }`;
                let isCurrentTeamWinning = matchScore[ 0 ] > matchScore[ 1 ];
                let isOpponentTeamWinning = matchScore[ 1 ] > matchScore[ 0 ];
                let currentTeamScore = matchScore[ 0 ];
                let opponentTeamScore = matchScore[ 1 ];
                return (
                    <div
                        className={ styles.match_row }
                        key={ index }
                    >
                        <div className={ styles.date }>
                            { getTodayString( formattedDate ) }
                            ,&nbsp;
                            { getCorrectTime( match.beginAt ) }
                        </div>
                        <div className={ styles.match_score }>
                            <div
                                className={ `${ styles.current_team } ${ matchScore[ 0 ] > matchScore[ 1 ] ? styles.winning_text : null }` }>
                                <img
                                    src={ currentTeamLogo || notFoundIcon.src }
                                    alt={ `${ currentTeamApiName } logo` }
                                />
                                <div>
                                    { currentTeamApiName }
                                </div>
                            </div>
                            <div className={ styles.score }>
                                <span
                                    className={ `${ isCurrentTeamWinning ? styles.winning_text : null }` }>
                                    { currentTeamScore }
                                </span>
                                &nbsp;:&nbsp;
                                <span
                                    className={ `${ isOpponentTeamWinning ? styles.winning_text : null }` }>
                                    { opponentTeamScore }
                                </span>
                            </div>
                            <div
                                className={ `${ styles.opponent_team } ${ isOpponentTeamWinning ? styles.winning_text : null }` }>

                                <div>
                                    { opponentTeamName }
                                </div>
                                <img
                                    src={ opponentTeamLogo || notFoundIcon.src }
                                    alt={ `${ opponentTeamName } logo` }
                                />
                            </div>
                        </div>
                    </div>
                );
            } ) : <p className={styles.no_data}>No data available for {team_name}</p>
            }
        </div>
    )
};

export default WinLoseMatchFeed;
