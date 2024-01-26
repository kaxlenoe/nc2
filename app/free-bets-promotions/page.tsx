import { FreeBetsPromotions } from '@/components/FreeBetsPromotions';
import { getPageStaticStrings, getStrapiContentByPosition } from '@/utils/strapi';
import { Suspense } from 'react';
import SeoText from '@/components/common/SeoText';
import { findObjectByKey } from '@/utils/helpers';
export const revalidate = 0;
export const dynamic = 'force-dynamic';
export default async function Page() {
    const defaultBonusesData: any = await getStrapiContentByPosition(
        'default_bonuses_page',
    );

    const pageStaticStringsApiResponse = await getPageStaticStrings( '/free-bets-promotions' );
    const PAGE_STATIC_STRINGS: IPageStaticString[] = pageStaticStringsApiResponse.data?.[ 0 ]?.attributes?.strings || null;
    const SEO_TEXT = findObjectByKey( PAGE_STATIC_STRINGS, 'alias', 'SEO_TEXT' )?.text?.toString() || undefined;
    const SEO_TEXT_HTML = findObjectByKey( PAGE_STATIC_STRINGS, 'alias', 'SEO_TEXT' )?.html?.toString() || undefined;
    const SEO_HEADING = findObjectByKey( PAGE_STATIC_STRINGS, 'alias', 'SEO_HEADING' )?.text?.toString() || undefined;

    return (
        <Suspense fallback={ <div>Loading...</div> }>
            <FreeBetsPromotions defaultBonusesData={ defaultBonusesData.data }/>
            <SeoText SEO_TEXT={ SEO_TEXT } SEO_TEXT_HTML={ SEO_TEXT_HTML } SEO_HEADING={ SEO_HEADING }/>
        </Suspense>
    );
}
