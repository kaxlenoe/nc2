import { getDotaData, getDotaMatchById, getDotaTournaments, } from '@/utils/api';
import { MatchesPage } from '@/components/MatchesPage';
import { matchStatuses } from '@/constants';
import { getPageStaticStrings, getStrapiContentByPosition, } from '@/utils/strapi';
import SeoText from '@/components/common/SeoText';
import { findObjectByKey } from '@/utils/helpers';

export const revalidate = 0;
export const dynamic = 'force-dynamic';
export default async function Dota(
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
        dotaTournaments,
        highlightsData,
        pageStaticStringsApiResponse,
        { data: dotaResults },
    ] = await Promise.all( [
        getDotaData( {
            page: 1,
            take: 20,
            query,
        } ),
        getDotaTournaments(),
        getDotaData( {
            page: 1,
            take: 20,
        } ),
        getStrapiContentByPosition( 'sidebar_matches_dota' ),
        getPageStaticStrings( '/matches/dota-2' ),
        getDotaData( {
            status: matchStatuses.past,
            order: 'DESC',
            page: 1,
            take: 20,
            query,
        } ),
    ] );

    const dataTournaments = [
        ...dotaTournaments.data.map( ( tournament: any ) => ( {
            ...tournament,
            esportCode: 'dota2',
        } ) ),
    ];

    const tournamentId = searchParams?.tournaments?.toString();


    const highlightsDataWithOdds = highlightsData.data
                                                 .filter(
                                                     ( item: { odds: any[] } ) =>
                                                         item.odds.length !== 0 && item.odds.every( ( odd ) => odd.winner !== null ),
                                                 )
                                                 .slice( 0, 3 );

    const dataTournamentsId = tournamentId
        ? await getDotaMatchById( tournamentId )
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
                resultsData={ dotaResults }
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
