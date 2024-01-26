import React from 'react';
import styles from './WinRateChart.module.scss';
import { calculateWinRate } from '@/utils/helpers';

type PropsType = {
    team_name: string;
    last_matches?: any;
};

const isWinning = ( prob: number ) => prob > 0.5


const WinRateChart: React.FC<PropsType> = ( { team_name, last_matches } ) => {
    let [ wins, looses, winRate ] = [-1,-1,-1];
    let looseRate = -1;

    if (team_name && last_matches){
        [ wins, looses, winRate ] = calculateWinRate( last_matches, team_name );
        looseRate = 100 - winRate;
    }
    const teamNameAndLastMatchesExist = team_name && last_matches && last_matches.length !== 0;
    const ratesAreNotNegative = winRate != -1 && looseRate != -1;
    const isAllDataAvailable = teamNameAndLastMatchesExist && ratesAreNotNegative;
    return (
        <>
            {
                (
                <div className={ styles.wrapper }>
                    <div className={ styles.winLoseWrapper }>
                        <div className={ styles.matchesWin }>
                            <div>Won ({ isAllDataAvailable ? wins : ` - ` })</div>
                        </div>
                        <div className={ styles.matchesLose }>
                            <div>Lost ({ isAllDataAvailable ? looses : ` - `  })</div>
                        </div>
                    </div>
                    <div className={ styles.chartWrapper }>
                        <div
                            className={ `${ styles.chart } ${ isAllDataAvailable ? styles.chartWin : `${styles.chartMuted} ${styles.chartMutedWin}` }` }
                            style={ { flexBasis: `${ isAllDataAvailable ? winRate : 50 }%` } }
                        ></div>
                        <div
                            className={ `${ styles.chart } ${ isAllDataAvailable ? styles.chartLose : `${styles.chartMuted} ${styles.chartMutedLose}` }` }
                            style={ { flexBasis: `${ isAllDataAvailable ? looseRate : 50 }%` } }
                        ></div>
                    </div>
                    <div className={ styles.percentageWrapper }>
                        <div className={ styles.percentageWin }>
                            <div>{ isAllDataAvailable ? `${ winRate }%` : `N/A` }</div>
                        </div>
                        <div className={ styles.percentageLose }>
                            <div>{ isAllDataAvailable ? `${ looseRate }%` : `N/A` }</div>
                        </div>
                    </div>
                </div>
                )
            }
        </>
    );
};

export default WinRateChart;
