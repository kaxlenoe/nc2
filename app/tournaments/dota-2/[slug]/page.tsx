import { getDotaGameByTournamentByID, } from '@/utils/api';
import TournamentPage from '@/components/TournamentPage/TournamentPage';
import { getPageStaticStrings, getStrapiContentByPosition } from '@/utils/strapi';
import SeoText from '@/components/common/SeoText';
import { findObjectByKey, getIdFromSlug, replaceVariablesInText } from '@/utils/helpers';

export const revalidate = 0;
const Page = async ( { params }: { params: { slug: string } } ) => {


    const tournamentData = await getDotaGameByTournamentByID(
        getIdFromSlug( params.slug ),
        [ 'UPCOMING', 'RUNNING' ],
        'ASC',
    );
    const resultsData = await getDotaGameByTournamentByID(
        getIdFromSlug( params.slug ),
        [ 'PAST' ],
        'DESC',
    );

    const sidebarLandingData: any =
        await getStrapiContentByPosition( 'sidebar_tournament' );

    const textVariablesMap = {
        '%ESPORT_NAME%': 'Dota 2',
        '%TOURNAMENT_NAME%': tournamentData.data?.[0]?.leagueName || 'tournament',
    };

    // Get SEO template from STRAPI
    const pageStaticStringsApiResponse = await getPageStaticStrings( '/tournaments/[game]/[slug]' );
    const PAGE_STATIC_STRINGS: IPageStaticString[] = pageStaticStringsApiResponse.data?.[ 0 ]?.attributes?.strings || null;
    const SEO_TEXT = findObjectByKey( PAGE_STATIC_STRINGS, 'alias', 'SEO_TEXT' )?.text?.toString() || undefined;
    const SEO_TEXT_HTML = replaceVariablesInText(findObjectByKey( PAGE_STATIC_STRINGS, 'alias', 'SEO_TEXT' )?.html?.toString() || '', textVariablesMap)
    const SEO_HEADING = replaceVariablesInText( findObjectByKey( PAGE_STATIC_STRINGS, 'alias', 'SEO_HEADING' )?.text?.toString() || '', textVariablesMap )


    return (
        <>
            <TournamentPage
                data={ tournamentData?.data }
                resultsData={ resultsData?.data }
                sidebarLandingData={ sidebarLandingData.data }
            />
            <SeoText SEO_TEXT={ SEO_TEXT } SEO_TEXT_HTML={ SEO_TEXT_HTML } SEO_HEADING={ SEO_HEADING }/>
        </>
    );
};

export default Page;
