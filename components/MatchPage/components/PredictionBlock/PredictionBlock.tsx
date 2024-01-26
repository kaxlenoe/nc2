import React from 'react';
import styles from './PredictionBlock.module.scss';
import { notFoundIcon } from '@/constants/StaticIcons'

type PropsType = {
    matchData: any;
};
const PredictionBlock: React.FC<PropsType> = ( { matchData } ) => {
    let probAPercentage;
    let probBPercentage;
    let probTiePercentage;
    if ( !matchData ) {
        return null;
    }
    else {
        probAPercentage = ( matchData.probTeamA * 100 ).toFixed( 2 ) + '%';
        probTiePercentage = matchData.probTie ? ( matchData.probTie * 100 ).toFixed( 2 ) + '%' : null;
        probBPercentage = ( matchData.probTeamB * 100 ).toFixed( 2 ) + '%';
    }

    const isWinning = ( prob: number ) => prob > 0.5

    const teamALogo = matchData?.games?.[ 0 ]?.teams?.[ 0 ]?.logo || notFoundIcon.src;
    const teamBLogo = matchData?.games?.[ 0 ]?.teams?.[ 1 ]?.logo || notFoundIcon.src;

    return (
        <div className={ styles.wrapper }>
            <div className={ styles.probs }>
                <div className={ styles.probA } style={ { flexBasis: probAPercentage } }>
                    <div className={ 'percentage' }>
                        { probAPercentage }
                    </div>
                    <div className={ isWinning( matchData.probTeamA ) ? styles.chartWin : styles.chartLose }></div>
                    <div className={ `${ styles.teamName } ${ styles.teamAName }` }>
                        <img
                            src={ teamALogo }
                            alt={ `${ matchData.teamAName } logo` }
                        />
                        <div>{ matchData.teamAName }</div>
                    </div>
                </div>
                { probTiePercentage
                    ?
                    <div className={ styles.probTie } style={ { flexBasis: probTiePercentage } }>
                        <div className={ 'percentage' }>
                            { probTiePercentage }
                        </div>
                        <div className={ styles.chartTie }></div>
                    </div>
                    :
                    null
                }
                <div className={ styles.probB } style={ { flexBasis: probBPercentage } }>
                    <div className={ 'percentage' }>
                        { probBPercentage }
                    </div>
                    <div className={ isWinning( matchData.probTeamB ) ? styles.chartWin : styles.chartLose }></div>
                    <div className={ `${ styles.teamName } ${ styles.teamBName }` }>
                        <div>{ matchData.teamBName }</div>
                        <img
                            src={ teamBLogo }
                            alt={ `${ matchData.teamBName } logo` }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PredictionBlock;
