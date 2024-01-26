/* Standard imports */
import React, { FC } from 'react';

/* External dependencies */
import { format } from 'date-fns';

/* Types and helpers */
import { IMatch } from '@/types/games';
import { findMaxValuesWithNames, getCorrectOddData } from '@/utils/odds';
import { getCorrectTime, getMatchResult, getTodayString, priceToString, } from '@/utils/helpers';

/* Constants */
import { notFoundIcon } from '@/constants/StaticIcons';

/* Components */
/* Styles */
import styles from './MatchMainData.module.scss';
import Image from 'next/image';
import { ISportbook, SPORTBOOKS_STATIC } from '@/constants/SportsbooksData';
import { Countdown } from '@/components/MatchPage/components/Countdown';
import TeamScore from './components/TeamScore';

/* Interfaces */
interface MatchMainDataProps {
    match: IMatch;
    isPast: boolean;
    isLive: boolean;
    isUpcoming: boolean;
    isToday: boolean;
    timeToStart?: string;
}

const MatchMainData: FC<MatchMainDataProps> = ( {
    match,
    isPast,
    isLive,
    isUpcoming,
    isToday,
} ) => {

    const matchResult = getMatchResult( match );

    /* Responsive hook */
    /*  const { isMobileSm } = useWindowSize();*/

    const formatDate = ( date: string | number | Date ) => {
        if ( date && date !== 'undefined' ) {
            return format( new Date( date ), 'EEE L/d/y' );
        }
        else {
            return 'Unknown date';
        }
    };


    const formattedDate = formatDate( match?.beginAt );
    const bestOddsValues = findMaxValuesWithNames( getCorrectOddData( match ) );

    // Extracted values for readability
    const leagueLogo = match?.leagueLogo || notFoundIcon.src;
    const leagueName = match?.leagueName;
    const firstGame = match?.games?.[ 0 ];
    const homeTeamGame = firstGame?.teams?.[ 0 ];
    const homeTeamName = homeTeamGame?.name;
    const homeTeamLogo = homeTeamGame?.logo || notFoundIcon.src;
    const homeBestOddName = bestOddsValues?.maxHomeName || null;
    const homeBestOddPrice = priceToString( bestOddsValues.maxHome );
    const homeBestOddLink = bestOddsValues.maxHomeName ? ( SPORTBOOKS_STATIC[ bestOddsValues.maxHomeName ] as ISportbook )?.link : '/'
    const homeBestOddBgColor = bestOddsValues.maxHomeName ? ( SPORTBOOKS_STATIC[ bestOddsValues.maxHomeName ] as ISportbook )?.color : '/'
    const homeBestOddLogo = bestOddsValues.maxHomeName ? ( SPORTBOOKS_STATIC[ bestOddsValues.maxHomeName ] as ISportbook )?.icon : '/'
    const awayTeamGame = firstGame?.teams?.[ 1 ];
    const awayTeamName = awayTeamGame?.name;
    const awayTeamLogo = awayTeamGame?.logo || notFoundIcon.src;
    const awayBestOddName = bestOddsValues?.maxAwayName || null;
    const awayBestOddPrice = priceToString( bestOddsValues.maxAway );
    const awayBestOddLink = bestOddsValues.maxAwayName ? ( SPORTBOOKS_STATIC[ bestOddsValues.maxAwayName ] as ISportbook )?.link : '/'
    const awayBestOddBgColor = bestOddsValues.maxAwayName ? ( SPORTBOOKS_STATIC[ bestOddsValues.maxAwayName ] as ISportbook )?.color : '/'
    const awayBestOddLogo = bestOddsValues.maxAwayName ? ( SPORTBOOKS_STATIC[ bestOddsValues.maxAwayName ] as ISportbook )?.icon : '/'
    const drawBestOddName = bestOddsValues.maxDrawName || null;
    const drawBestOddPrice = priceToString( bestOddsValues.maxDraw );
    const drawBestOddLink = bestOddsValues.maxDrawName ? ( SPORTBOOKS_STATIC[ bestOddsValues.maxDrawName ] as ISportbook )?.link : '/'
    const drawBestOddBgColor = bestOddsValues.maxDrawName ? ( SPORTBOOKS_STATIC[ bestOddsValues.maxDrawName ] as ISportbook )?.color : '/'
    const drawBestOddLogo = bestOddsValues.maxDrawName ? ( SPORTBOOKS_STATIC[ bestOddsValues.maxDrawName ] as ISportbook )?.icon : '/'
    const bestOfValue = match?.numberOfGames || null;

    return (
        <>
            <div className={ styles.wrapper }>
                {/* Header */ }
                <div className={ styles.header }>
                    <div className={ styles.header_league }>
                        <Image className={ styles.header_league_logo }
                               width={ 20 } height={ 20 }
                               objectFit="contain"
                               src={ leagueLogo }
                               alt={ leagueName }/>
                        <span className={ styles.header_league_text }>{ leagueName }</span>
                    </div>
                    {/* Divider in case it's needed
                    <span className={ styles.header_text_divider }>&middot;</span>*/}
                    { // Show best of badge if it's presented
                        bestOfValue &&
                        <div className={ styles.header_bestof_text }>
                            Bo{ bestOfValue }
                        </div>
                    }
                </div>
                {/* 3-columns layout */ }
                <div className={ styles.layout }>
                    {/*Team bg images (absolute positioned)*/}
                    <div className={ styles.teams_bg }>
                        <Image className={ styles.teams_bg_home }
                               width={ 200 } height={ 200 }
                               objectFit="contain"
                               src={ homeTeamLogo }
                               alt={ homeTeamName }/>
                        <Image className={ styles.teams_bg_away }
                               width={ 200 } height={ 200 }
                               objectFit="contain"
                               src={ awayTeamLogo }
                               alt={ awayTeamName }/>
                    </div>
                    {/* Home team */ }
                    <div className={ styles.layout_left }>
                        <div className={ styles.team_logo_wrapper }>
                            <Image className={ styles.team_logo }
                                   width={ 60 } height={ 60 }
                                   objectFit="contain"
                                   src={ homeTeamLogo }
                                   alt={ `${ homeTeamName } logo` }/>
                        </div>
                        <div className={ styles.team_name }>
                            { homeTeamName }
                        </div>
                        { // Showing the best Home odd only if it's exist and match is not past
                            ( !isPast && homeBestOddName) &&
                            <a href={ homeBestOddLink } target={ '_blank' } className={ styles.best_odd }>
                                <div className={ styles.best_odd_logo_wrapper }
                                     style={ { backgroundColor: homeBestOddBgColor } }>
                                    <Image className={ styles.best_odd_logo }
                                           src={ homeBestOddLogo }
                                           width={ 77 } height={ 32 }
                                           objectFit="contain"
                                           alt={ `${ homeBestOddName } logo` }/>
                                </div>
                                <div className={ styles.best_odd_value }>
                                    { homeBestOddPrice }
                                </div>
                            </a>
                        }
                    </div>
                    {/* Middle layout */ }
                    <div className={ styles.layout_middle }>
                        { // Show 'Live' badge only if match is live
                            isLive &&
                            <div className={ styles.live_badge }>
                                Live
                            </div>
                        }
                        { // Show match date only if match is not live
                            !isLive &&
                            <div className={ styles.date }>
                                <div className={ styles.date_string }>
                                    { getTodayString( formattedDate ) }
                                </div>
                                <div className={ styles.date_time }>
                                    { getCorrectTime( match?.beginAt ) }
                                </div>
                            </div>
                        }
                        { // Show countdown only if match is upcoming
                            isUpcoming &&
                            <div className={ styles.countdown }>
                                <Countdown timeToStart={ match?.beginAt }/>
                            </div>
                        }
                        { // Show score if match is past
                            isPast &&
                            <div className={ styles.score }>
                                <TeamScore score={ matchResult[ 0 ] } isWinner={ matchResult[ 0 ] > matchResult[ 1 ] }/>
                                <span className={ styles.score_divider }>—</span>
                                <TeamScore score={ matchResult[ 1 ] } isWinner={ matchResult[ 1 ] > matchResult[ 0 ] }/>
                            </div>

                        }
                        { // Showing the best Draw odd only if it's exist and match is not past
                            ( !isPast && drawBestOddName ) &&
                            <div className={ styles.draw_odd }>
                                <span className={ styles.draw_odd_text }>
                                    { `draw` }
                                </span>
                                <a href={ awayBestOddLink } target={ '_blank' } className={ styles.best_odd }>
                                    <div className={ styles.best_odd_logo_wrapper }
                                         style={ { backgroundColor: awayBestOddBgColor } }>
                                        <Image className={ styles.best_odd_logo }
                                               src={ awayBestOddLogo }
                                               width={ 75 } height={ 40 }
                                               objectFit="contain"
                                               alt={ `${ awayBestOddName } logo` }/>
                                    </div>
                                    <div className={ styles.best_odd_value }>
                                        { awayBestOddPrice }
                                    </div>
                                </a>

                            </div>
                        }
                    </div>
                    {/* Away team */ }
                    <div className={ styles.layout_right }>
                        <div className={ styles.team_logo_wrapper }>
                            <Image className={ styles.team_logo }
                                   width={ 60 } height={ 60 }
                                   src={ awayTeamLogo }
                                   objectFit="contain"
                                   alt={ `${ awayTeamName } logo` }/>
                        </div>
                        <div className={ styles.team_name }>
                            { awayTeamName }
                        </div>
                        { // Showing the best Away odd only if it's exist and match is not past
                            ( !isPast && awayBestOddName ) &&
                            <a href={ awayBestOddLink } target={ '_blank' } className={ styles.best_odd }>
                                <div className={ styles.best_odd_logo_wrapper }
                                     style={ { backgroundColor: awayBestOddBgColor } }>
                                    <Image className={ styles.best_odd_logo }
                                           src={ awayBestOddLogo }
                                           width={ 75 } height={ 40 }
                                           objectFit="contain"
                                           alt={ `${ awayBestOddName } logo` }/>
                                </div>
                                <div className={ styles.best_odd_value }>
                                    { awayBestOddPrice }
                                </div>
                            </a>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default MatchMainData;
