'use client';
import React, { FC } from 'react';
import MatchMainData from './components/MatchMainData/MatchMainData';
import Roster from './components/Roster/Roster';
import Odds from './components/Odds/Odds';

import styles from './MatchPage.module.scss';
import { isEqual } from 'date-fns';
import { PredictionBlock } from '@/components/MatchPage/components/PredictionBlock';
import { TeamStatistics } from '@/components/MatchPage/components/TeamStatistics';
import { Breadcrumbs } from '../Breadcrumbs';
import { MATCH_STATUSES } from '@/constants/MatchStatuses';
import { findActualStream } from '@/utils/helpers';
import useWindowSize from '@/hooks/useWindowSize';
import { ESPORTS_SLUG_BY_CODE } from '@/constants/EsportCodes';

type PropsType = {
    id?: string;
    matchData?: any;
};

const hostname =
    typeof window !== 'undefined' && window.location.hostname
        ? window.location.hostname
        : '';
const getLeagueSlug = ( leagueName: string, leagueId: number,esportCode:string ) => {
    const leagueNameSlug = leagueName?.replace( ' ', '-' ) || '';
    return `/tournaments/${ESPORTS_SLUG_BY_CODE[esportCode]}/${ leagueNameSlug }-${ leagueId }`;

}
const MatchPage: FC<PropsType> = ( { id, matchData } ) => {
    const isToday = isEqual( new Date(), new Date( matchData?.matchBegin ) );

    const isUpcoming = matchData?.status === MATCH_STATUSES.UPCOMING;
    const isLive = matchData?.status === MATCH_STATUSES.RUNNING;
    const isPast = matchData?.status === MATCH_STATUSES.PAST;
    const isContainingOdds = matchData?.odds?.length > 0;
    const shouldShowOdds = !isLive && !isPast && isContainingOdds;

    const { isMobile } = useWindowSize()

    const widthA = ( matchData?.probTeamA * 100 ).toFixed( 2 ) + '%';
    const widthB = ( matchData?.probTeamB * 100 ).toFixed( 2 ) + '%';
    const liveStreamData = findActualStream( matchData?.streamsList, 'en' );
    return (
        <div className={ styles.match_page }>
            <Breadcrumbs current_item_heading={ `${ matchData?.teamAName } vs ${ matchData?.teamBName }` }
                         custom_url={ {
                             path: getLeagueSlug( matchData?.leagueName, matchData?.leagueId, matchData?.esportCode ),
                             label: matchData?.leagueName
                         } }
            />
            <MatchMainData
                match={ matchData }
                isToday={ isToday }
                isUpcoming={ isUpcoming }
                isLive={ isLive }
                isPast={ isPast }
            />
            <div className={ styles.content_layout }>
                <div className={ styles.content }>
                    { /* Live stream */
                        ( isLive && liveStreamData ) && (
                            <div className={ `${ styles.live_stream_wrapper }` }>
                                <div className={ `${ styles.block_title } ${ styles.block_title_live }` }><span
                                    className={ `${ styles.block_title_live_dot } animate-pulse` }></span> Live stream
                                </div>
                                <iframe
                                    src={ `${ liveStreamData.embed_url }&parent=${ hostname }&muted=true&autoplay=false` }
                                    width={ `100%` } height={ isMobile ? `300px` : `420px` }
                                    allowFullScreen
                                ></iframe>

                            </div>
                        ) }
                    { ( !isPast && matchData?.probTeamA ) ? (
                        <>
                            <div className={ styles.block_title }>AI Prediction</div>
                            <PredictionBlock matchData={ matchData }/>
                        </>
                    ) : null }
                    { shouldShowOdds && <Odds matchData={ matchData }/> }
                    <div className={ styles.block_title }>Teams last matches & winrate</div>
                    <TeamStatistics matchData={ matchData }/>
                </div>
                <div className={ styles.aside }>
                    <div className={ styles.block_title }>Team Roster</div>
                    <Roster match={ matchData } showContent/>
                </div>
            </div>
        </div>
    );
};

export default MatchPage;
