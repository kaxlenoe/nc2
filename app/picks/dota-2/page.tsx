// Get some data
import { getCSGOPicks, getDotaPicks, getLOLPicks } from '@/utils/api';
import { getPageStaticStrings, getStrapiContentByPosition } from '@/utils/strapi';
import { findObjectByKey } from '@/utils/helpers';
import PicksPage from '@/components/PicksPage/PicksPage';
import SeoText from '@/components/common/SeoText';

export const revalidate = 0;

export default async function Picks() {
    const { data: dataPicks } = await getDotaPicks();

    const sidebarBannerData: any = await getStrapiContentByPosition(
        'sidebar_picks_dota',
    );
    // Static strings for SEO
    const pageStaticStringsApiResponse =
        await getPageStaticStrings( '/picks/dota-2' );
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
        <div>
            <PicksPage
                dataPicks={ dataPicks }
                sidebarBannerData={ sidebarBannerData.data }
            />
            <SeoText
                SEO_TEXT={ SEO_TEXT }
                SEO_TEXT_HTML={ SEO_TEXT_HTML }
                SEO_HEADING={ SEO_HEADING }
            />
        </div>
    );
}
