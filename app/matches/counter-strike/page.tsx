import { getCSGOData, getCSGOMatchById, getCSGOTournaments, } from '@/utils/api';

import { MatchesPage } from '@/components/MatchesPage';
import { matchStatuses } from '@/constants';
import { getPageStaticStrings, getStrapiContentByPosition, } from '@/utils/strapi';
import SeoText from '@/components/common/SeoText';
import { findObjectByKey } from '@/utils/helpers';

export const revalidate = 0;
export const dynamic = 'force-dynamic';
const CSGO = async (
    {
        params,
        searchParams,
    }: {
        params: { id: string };
        searchParams: {
            tournaments: any;
            search: string;
        };
    } ) => {
    const query = searchParams?.search;

    const [
        data,
        csgoTournaments,
        highlightsCsgo,
        { data: csgoDataResults },
        pageStaticStringsApiResponse,
    ] = await Promise.all( [
        getCSGOData( {
            order: 'ASC',
            page: 1,
            take: 20,
            query,
        } ),
        getCSGOTournaments(),
        getCSGOData( {
            page: 1,
            take: 20,
        } ),
        getCSGOData( {
            status: matchStatuses.past,
            order: 'DESC',
            page: 1,
            take: 20,
            query,
        } ),
        getPageStaticStrings( '/matches/counter-strike' ),
    ] );

    const dataTournaments = [
        ...csgoTournaments.data.map( ( tournament: any ) => ( {
            ...tournament,
            esportCode: 'csgo',
        } ) ),
    ];

    const tournamentId = searchParams?.tournaments?.toString();

    const dataTournamentsId = tournamentId
        ? await getCSGOMatchById( tournamentId )
        : data.data;

    const highlightsDataWithOdds = highlightsCsgo.data
                                                 .filter(
                                                     ( item: { odds: any[] } ) =>
                                                         item.odds.length !== 0 && item.odds.every( ( odd ) => odd.winner !== null ),
                                                 )
                                                 .slice( 0, 3 );

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
                resultsData={ csgoDataResults }
                highlightsData={ highlightsDataWithOdds }
            />
            <SeoText
                SEO_TEXT={ SEO_TEXT }
                SEO_TEXT_HTML={ SEO_TEXT_HTML }
                SEO_HEADING={ SEO_HEADING }
            />
        </>
    );
};

export default CSGO;
