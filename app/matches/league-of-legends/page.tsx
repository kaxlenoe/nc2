import { getLeagueData, getLolMatchById, getLoLTournaments, } from '@/utils/api';
import { MatchesPage } from '@/components/MatchesPage';
import { matchStatuses } from '@/constants';
import { getPageStaticStrings, getStrapiContentByPosition, } from '@/utils/strapi';
import SeoText from '@/components/common/SeoText';
import { findObjectByKey } from '@/utils/helpers';

export const revalidate = 0;
export const dynamic = 'force-dynamic';
export default async function League(
    {
        searchParams,
    }: {
        searchParams: {
            tournaments: any;
            search: string;
        };
    } ) {
    const query = searchParams?.search;

    const [
        data,
        leagueTournaments,
        { data: lolResults },
        highlightsData,
        pageStaticStringsApiResponse,
        { data: sidebarLandingData },
    ] = await Promise.all( [
        getLeagueData( {
            page: 1,
            take: 20,
            query,
        } ),
        getLoLTournaments(),
        getLeagueData( {
            status: matchStatuses.past,
            order: 'DESC',
            page: 1,
            take: 20,
            query,
        } ),
        getLeagueData( {
            page: 1,
            take: 20,
        } ),
        getPageStaticStrings( '/matches/leagues-of-legends' ),
        getStrapiContentByPosition( 'sidebar_matches_lol' ),
    ] );

    const highlightsDataWithOdds = highlightsData.data
                                                 .filter(
                                                     ( item: { odds: any[] } ) =>
                                                         item.odds.length !== 0 && item.odds.every( ( odd ) => odd.winner !== null ),
                                                 )
                                                 .slice( 0, 3 )
    const dataTournaments = [
        ...leagueTournaments?.data.map( ( tournament: any ) => ( {
            ...tournament,
            esportCode: 'lol',
        } ) ),
    ];

    const tournamentId = searchParams?.tournaments?.toString();

    const dataTournamentsId = tournamentId
        ? await getLolMatchById( tournamentId )
        : data.data;

    const PAGE_STATIC_STRINGS: IPageStaticString[] =
        pageStaticStringsApiResponse.data?.[ 0 ]?.attributes?.strings || null;
    const SEO_TEXT =
        findObjectByKey( PAGE_STATIC_STRINGS, 'alias', 'SEO_TEXT' )?.text?.toString() ||
        undefined;
    const SEO_TEXT_HTML =
        findObjectByKey( PAGE_STATIC_STRINGS, 'alias', 'SEO_TEXT' )?.html?.toString() ||
        undefined;
    const SEO_HEADING =
        findObjectByKey( PAGE_STATIC_STRINGS, 'alias', 'SEO_HEADING' )?.text?.toString() ||
        undefined;

    return (
        <>
            <MatchesPage
                data={ dataTournamentsId }
                dataTournaments={ dataTournaments }
                resultsData={ lolResults }
                sidebarLandingData={ sidebarLandingData }
                highlightsData={ highlightsDataWithOdds }
            />
            <SeoText
                SEO_TEXT={ SEO_TEXT }
                SEO_TEXT_HTML={ SEO_TEXT_HTML }
                SEO_HEADING={ SEO_HEADING }
            />
        </>
    );
}
