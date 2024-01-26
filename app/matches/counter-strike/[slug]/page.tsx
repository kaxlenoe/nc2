import { MatchPage } from '@/components/MatchPage';
import { getCSGOMatchById } from '@/utils/api';
import SeoText from '@/components/common/SeoText';
import { calculateWinRate, findObjectByKey, getIdFromSlug, replaceVariablesInText } from '@/utils/helpers';
import { findMaxValuesWithNames, getCorrectOddData } from '@/utils/odds';
import { SPORTBOOKS_READABLES } from '@/constants/SportsbooksData';
import { getPageStaticStrings } from '@/utils/strapi';

export const revalidate = 0;
const CSGO = async ( { params }: { params: { slug: string } } ) => {
    const matchIdFromSlug = getIdFromSlug( params.slug )
    const matchData = await getCSGOMatchById( matchIdFromSlug );
    const bestOddsValues = findMaxValuesWithNames( getCorrectOddData( matchData ) );

    const [ teamAWins, teamALooses, teamAWinRate ] = calculateWinRate( matchData?.aMatches, matchData?.teamAName ) || null;
    const [ teamBWins, teamBLooses, teamBWinRate ] = calculateWinRate( matchData?.aMatches, matchData?.teamAName ) || null;

    const teamAProbability = ( matchData.probTeamA * 100 ).toFixed( 2 ) || undefined;
    const teamBProbability = ( matchData.probTeamB * 100 ).toFixed( 2 ) || undefined;

    const textVariablesMap = {
        '%ESPORT_NAME%': 'CS:GO, CS:2',
        '%TEAM_A_NAME%': matchData.teamAName,
        '%TEAM_B_NAME%': matchData.teamBName,
        '%TOURNAMENT_NAME%': matchData.leagueName,
        '%TEAM_A_WINRATE%': `${ teamAWinRate }%`,
        '%TEAM_B_WINRATE%': `${ teamBWinRate }%`,
        '%TEAM_A_PROB%': `${ teamAProbability }%`,
        '%TEAM_B_PROB%': `${ teamBProbability }%`,
        '%TEAM_A_BEST_ODD%': bestOddsValues.maxHome.toFixed( 2 ),
        '%TEAM_A_BEST_ODD_PROVIDER%': SPORTBOOKS_READABLES[ bestOddsValues.maxHomeName || 'cloudbet' ],
        '%TEAM_B_BEST_ODD%': bestOddsValues.maxAway.toFixed( 2 ),
        '%TEAM_B_BEST_ODD_PROVIDER%': SPORTBOOKS_READABLES[ bestOddsValues.maxAwayName || 'cloudbet' ]
    };

    // Get SEO template from STRAPI
    const pageStaticStringsApiResponse = await getPageStaticStrings( '/matches/[game]/[slug]' );
    const PAGE_STATIC_STRINGS: IPageStaticString[] = pageStaticStringsApiResponse.data?.[ 0 ]?.attributes?.strings || null;
    const SEO_TEXT = findObjectByKey( PAGE_STATIC_STRINGS, 'alias', 'SEO_TEXT' )?.text?.toString() || undefined;
    const SEO_TEXT_HTML = replaceVariablesInText( findObjectByKey( PAGE_STATIC_STRINGS, 'alias', 'SEO_TEXT' )?.html?.toString() || '', textVariablesMap )
    const SEO_HEADING = replaceVariablesInText( findObjectByKey( PAGE_STATIC_STRINGS, 'alias', 'SEO_HEADING' )?.text?.toString() || '', textVariablesMap )

    return (
        <>
            <MatchPage id={ params.slug } matchData={ matchData }/>
            <SeoText SEO_TEXT={ SEO_TEXT } SEO_TEXT_HTML={ SEO_TEXT_HTML } SEO_HEADING={ SEO_HEADING }
                     isHeadingH1={ true }/>
        </>
    );
};

export default CSGO;
