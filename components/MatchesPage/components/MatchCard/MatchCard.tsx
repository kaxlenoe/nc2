import React from 'react';
import Image from 'next/image';
import cls from 'classnames';
import styles from './MatchCard.module.scss'; // Assuming you have a CSS module for styling
import { IMatch } from '@/types/games';
import { findMaxValuesWithNames, getCorrectOddData } from '@/utils/odds';
import {
    formatDate,
    getCorrectTime,
    getMatchResult,
    getTodayString,
    priceToString,
    removeSpaces,
} from '@/utils/helpers';
import { bestOddsIcon, csgoIcon, dotaIcon, lolIcon, notFoundIcon, playIcon } from '@/constants/StaticIcons';
import { useRouter } from 'next/navigation';
import { SPORTBOOKS_STATIC } from '@/constants/SportsbooksData';

type PropsType = {
    match: IMatch;
    isPredictionToggled: boolean;
    activeFilter: string;
};

const MatchCard: React.FC<PropsType> = ( { match, isPredictionToggled, activeFilter } ) => {
    const router = useRouter();
    const gameName = {
        lol: 'LOL',
        dota2: 'DOTA2',
        csgo: 'CS2',
    };

    const imageMap = {
        lol: lolIcon,
        dota2: dotaIcon,
        csgo: csgoIcon,
    };

    const getLink = (
        teamAName: string,
        teamBName: string,
        matchId: number | string,
        esportCode: string,
    ) => {
        let path = '';
        if ( esportCode === 'csgo' )
            path = `/matches/counter-strike/${ removeSpaces(
                teamAName,
            ) }-vs-${ removeSpaces( teamBName ) }-${ matchId }`;
        if ( esportCode === 'dota2' )
            path = `/matches/dota-2/${ removeSpaces( teamAName ) }-vs-${ removeSpaces(
                teamBName,
            ) }-${ matchId }`;
        if ( esportCode === 'lol' )
            path = `/matches/league-of-legends/${ removeSpaces(
                teamAName,
            ) }-vs-${ removeSpaces( teamBName ) }-${ matchId }`;
        return path;
    };

    //@ts-ignore
    const name = gameName[ match.esportCode ];

    const bestOddsValues = findMaxValuesWithNames( getCorrectOddData( match ) );
    const matchResult = getMatchResult( match );
    const formattedDate = formatDate( match.beginAt );
    const handleClick = () => {
        const link = getLink(
            match.teamAName,
            match.teamBName,
            match.id,
            match.esportCode,
        );
        router.push( link );
    };

    const teamALogo = match.games[ 0 ].teams?.[ 0 ]?.logo || notFoundIcon.src;
    const teamAName = match.games[ 0 ].teams?.[ 0 ]?.name || 'Team 1';
    const teamBLogo = match.games[ 0 ].teams?.[ 1 ]?.logo || notFoundIcon.src;
    const teamBName = match.games[ 0 ].teams?.[ 1 ]?.name || 'Team 2';
    const bestOddHomeBgColor = bestOddsValues.maxHomeName && ( SPORTBOOKS_STATIC[ bestOddsValues.maxHomeName ] as any ).color || 'red';
    const bestOddAwayBgColor = bestOddsValues.maxAwayName && ( SPORTBOOKS_STATIC[ bestOddsValues.maxAwayName ] as any ).color || 'red';
    const bestOddDrawBgColor = bestOddsValues.maxDrawName && ( SPORTBOOKS_STATIC[ bestOddsValues.maxDrawName ] as any ).color || 'red';
    const bestOddHomeUrl = bestOddsValues.maxHomeUrl
    const bestOddAwayUrl = bestOddsValues.maxAwayUrl
    const bestOddDrawUrl = bestOddsValues.maxDrawUrl

    const hasLiveStreams = match?.streamsList?.length > 0;

    return (
        <div
            className={ cls( styles.matchCard, {
                [ styles.matchCardDraw ]: bestOddsValues.maxDrawName,
            } ) }
            onClick={ handleClick }
        >
            <div className={ styles.matchRow }>
                <div className={ styles.matchDetails }>
                    <Image
                        //@ts-ignore
                        src={ imageMap[ match?.esportCode ] }
                        className={ styles.gameIcon}
                        priority
                        alt={ 'icon' }
                    />
                    <div className={ styles.matchInfo }>
                        { name }
                        &nbsp;&middot;&nbsp;
                        { match.leagueName }
                        &nbsp;&middot;&nbsp;
                        { match.tournamentName }
                        &nbsp;&middot;&nbsp;
                        { getTodayString( formattedDate ) }
                        &nbsp;&middot;&nbsp;
                        { getCorrectTime( match.beginAt ) }
                    </div>
                </div>
                <div className={ styles.matchOdds }>
                    <Image src={ bestOddsIcon } priority alt={ 'icon' }/>
                    Best Odds
                </div>
            </div>
            <div className={ styles.contentWrapper }>
                <div className={ styles.statusInfo }>
                    { activeFilter === 'RUNNING' ? (
                        <div className={ styles.live }>
                            <p>Live</p>
                        </div>
                    ) : null }

                    <div className={ styles.best_of }>Bo{ match.numberOfGames }</div>
                </div>

                <div className={ styles.mainInfo }>
                    <div className={ styles.teams_block }>
                        <div className={ styles.team_block }>
                            <div>
                                <img
                                    src={ teamALogo }
                                    alt={ `${ teamAName } logo` }
                                />
                                <p>{ teamAName } </p>
                            </div>
                        </div>

                        <div className={ styles.team_block }>
                            <div>
                                <img
                                    src={ teamBLogo }
                                    alt={ `${ teamBName } logo` }
                                />
                                <p>{ teamBName }</p>
                            </div>
                        </div>
                    </div>
                    {(activeFilter === 'UPCOMING' || activeFilter === 'RUNNING') && (
                    <div className={ styles.middleSection }>
                            <div className={ styles.predictionBlock }>
                                { isPredictionToggled && match.probTeamA && match.probTeamA * 100 !== 0 ? (
                                    <div className={ styles.predictionTeamA }>
                                        <div className="flex flex-grow items-center lg:pl-2 lg:mr-2">
                                            <div
                                                className={ cls( {
                                                    [ styles.chartValueLoose ]: match.probTeamA * 100 < 50,
                                                    [ styles.chartValueWin ]: match.probTeamA * 100 >= 50,
                                                } ) }
                                                style={ {
                                                    width: (match.probTeamA * 100).toFixed( 2 ) + '%',
                                                    display: 'flex',
                                                } }
                                            />
                                        </div>

                                        <p>{ ( match?.probTeamA * 100 ).toFixed( 2 ) + '%' }</p>
                                    </div>
                                ) : null }
                                { isPredictionToggled &&
                                match?.probTeamB &&
                                match?.probTeamB * 100 !== 0 ? (
                                    <div className={ styles.predictionTeamB }>
                                        <div className="flex flex-grow items-center lg:pl-2 lg:mr-2">
                                            <div
                                                className={ cls( {
                                                    [ styles.chartValueLoose ]: match.probTeamB * 100 < 50,
                                                    [ styles.chartValueWin ]: match.probTeamB * 100 >= 50,
                                                } ) }
                                                style={ { width: (match.probTeamB * 100).toFixed( 2 ) + '%' } }
                                            />
                                        </div>
                                        <p>{ ( match.probTeamB * 100 ).toFixed( 2 ) + '%' }</p>
                                    </div>
                                ) : null }
                            </div>
                    </div>
                    )}

                    <div className={ styles.rightSection }>

                        { activeFilter === 'PAST' && (
                            <div className={ styles.results }>
                                <div className={ styles.resultsTeamA }>
                                    <p
                                        className={ cls( {
                                            [ styles.winner ]: matchResult[ 0 ] > matchResult[ 1 ],
                                            [ styles.loser ]: matchResult[ 0 ] < matchResult[ 1 ],
                                        } ) }
                                    >
                                        { matchResult[ 0 ] }
                                    </p>
                                    <div className={ styles.resultsTeamB }>
                                        <p
                                            className={ cls( {
                                                [ styles.winner ]: matchResult[ 1 ] > matchResult[ 0 ],
                                                [ styles.loser ]: matchResult[ 1 ] < matchResult[ 0 ],
                                            } ) }
                                        >
                                            { matchResult[ 1 ] }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                        { (activeFilter === 'RUNNING' && hasLiveStreams) ? (
                            <div className={ styles.watchLive }>
                                WATCH LIVE
                                <img
                                    src={playIcon.src}
                                    alt={'Watch now'}
                                    className={styles.watchLiveIcon}
                                />
                            </div>
                        ) : activeFilter === 'UPCOMING' || activeFilter === 'RUNNING' ? (
                            <div className={ styles.betsWrapper }>
                                {/*Home best odd*/ }
                                { bestOddsValues.maxHomeName &&
                                    <div className={ styles.bets_block }>
                                        <a
                                            href={ bestOddHomeUrl }
                                            target={ '_blank' }
                                            className={ styles.bet_icon }
                                            style={ {
                                                backgroundColor: bestOddHomeBgColor,
                                            } }
                                        >
                                            <Image
                                                src={
                                                    ( SPORTBOOKS_STATIC[ bestOddsValues.maxHomeName ] as any )
                                                        .icon
                                                }
                                                priority
                                                alt={ 'icon' }
                                            />
                                            <div className={ styles.bet_value }>
                                                    { priceToString( bestOddsValues.maxHome ) }
                                            </div>
                                        </a>
                                    </div>
                                }
                                {/*Draw best odd*/ }


                                { bestOddsValues.maxDrawName &&
                                    <div className={ styles.draw_bets_block }>
                                        <div>X</div>
                                        <div className={ styles.bets_block }>
                                            <a
                                                href={ bestOddDrawUrl }
                                                target={ '_blank' }
                                                className={ styles.bet_icon }
                                                style={ {
                                                    backgroundColor: bestOddDrawBgColor,
                                                } }
                                            >
                                                <Image
                                                    src={
                                                        ( SPORTBOOKS_STATIC[ bestOddsValues.maxDrawName ] as any )
                                                            .icon
                                                    }
                                                    priority
                                                    alt={ 'icon' }
                                                />
                                                <div className={ styles.bet_value }>
                                                        { priceToString( bestOddsValues.maxDraw ) }
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                }
                                {/*Away best odd*/ }
                                { bestOddsValues.maxAwayName &&
                                    <div className={ styles.bets_block }>
                                        <a
                                            href={ bestOddAwayUrl }
                                            target={ '_blank' }
                                            className={ styles.bet_icon }
                                            style={ {
                                                backgroundColor: bestOddAwayBgColor,
                                            } }
                                        >
                                            <Image
                                                src={
                                                    ( SPORTBOOKS_STATIC[ bestOddsValues.maxAwayName ] as any )
                                                        .icon
                                                }
                                                priority
                                                alt={ 'icon' }
                                            />
                                            <div className={ styles.bet_value }>
                                                    { priceToString( bestOddsValues.maxAway ) }
                                            </div>
                                        </a>
                                    </div>
                                }
                            </div>
                        ) : null }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchCard;
