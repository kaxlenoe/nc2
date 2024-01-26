import React from 'react';

import styles from './TeamStatistics.module.scss';
import { notFoundIcon } from '@/constants/StaticIcons';

import { WinRateChart } from '@/components/MatchPage/components/TeamStatistics/components/WinRateChart';
import { WinLoseMatchFeed } from '@/components/MatchPage/components/TeamStatistics/components/WinLoseMatchFeed';

type PropsType = {
    matchData?: any;
};

const TeamStatistics: React.FC<PropsType> = ( { matchData } ) => {

    // Extracted values for readability
    // TODO: refactor to MatchPage.tsx
    const firstGame = matchData?.games?.[ 0 ];
    const teamA = firstGame?.teams?.[ 0 ];
    const teamB = firstGame?.teams?.[ 1 ];
    const teamALogo = teamA?.logo || notFoundIcon;
    const teamBLogo = teamB?.logo || notFoundIcon;

    return (
        <div className={ styles.wrapper }>
            <div className={ styles.teamAColumn }>
                <div className={ `${ styles.titleCard } ${ styles.titleCardHome }` }>
                    <img
                        src={ teamALogo }
                        alt={ `${ matchData?.teamAName } logo` }
                    />
                    <p>{ matchData?.teamAName }</p>
                </div>
                <div className={ styles.noData }>
                    { ( !matchData?.aMatches || !matchData?.teamAName ) && <p>No data</p> }
                </div>
                <div className={ styles.winningChart }>
                    { ( matchData?.aMatches && matchData?.teamAName ) &&
                        <WinRateChart team_name={ matchData?.teamAName } last_matches={ matchData?.aMatches  }/> }
                </div>
                <div className={ styles.matchFeed }>
                    { ( matchData?.aMatches && matchData?.teamAName ) &&
                        <WinLoseMatchFeed team_name={ matchData?.teamAName } last_matches={ matchData?.aMatches }/> }
                </div>
            </div>

            <div className={ styles.teamBColumn }>
                <div className={ `${ styles.titleCard } ${ styles.titleCardAway }` }>
                    <p>{ matchData?.teamBName }</p>
                    <img
                        src={ teamBLogo }
                        alt={ `${ matchData?.teamBName } logo` }
                    />
                </div>
                <div className={ styles.noData }>
                    { ( !matchData?.bMatches || !matchData?.teamBName ) && <p>No data</p> }
                </div>
                <div className={ styles.winningChart }>
                    { ( matchData?.bMatches && matchData?.teamBName ) &&
                        <WinRateChart team_name={ matchData?.teamBName } last_matches={ matchData?.bMatches }/> }
                </div>
                <div className={ styles.matchFeed }>
                    { ( matchData?.bMatches && matchData?.teamBName ) &&
                        <WinLoseMatchFeed team_name={ matchData?.teamBName } last_matches={ matchData?.bMatches }/> }
                </div>
            </div>
        </div>
    );
};

export default TeamStatistics;
