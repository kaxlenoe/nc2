import { Suspense } from 'react';
import FAQ from '@/components/FAQ/FAQ';
import SeoText from '@/components/common/SeoText';
import { getFaqItemsFromStrapi, getPageStaticStrings, getStrapiContentByPosition } from '@/utils/strapi';
import { findObjectByKey } from '@/utils/helpers';
export const revalidate = 0;
export const dynamic = 'force-dynamic';
export default async function Page() {
    const questionsData: any = await getFaqItemsFromStrapi();
    const sideBannerData: any = await getStrapiContentByPosition( 'sidebar_faq' );

    const pageStaticStringsApiResponse = await getPageStaticStrings( '/faq' );
    const PAGE_STATIC_STRINGS: IPageStaticString[] = pageStaticStringsApiResponse.data?.[ 0 ]?.attributes?.strings || null;
    const SEO_TEXT = findObjectByKey( PAGE_STATIC_STRINGS, 'alias', 'SEO_TEXT' )?.text?.toString() || undefined;
    const SEO_TEXT_HTML = findObjectByKey( PAGE_STATIC_STRINGS, 'alias', 'SEO_TEXT' )?.html?.toString() || undefined;
    const SEO_HEADING = findObjectByKey( PAGE_STATIC_STRINGS, 'alias', 'SEO_HEADING' )?.text?.toString() || undefined;

    return (
        <Suspense fallback={ <div>Loading...</div> }>
            <FAQ questionsData={questionsData?.data} sideBannerData={sideBannerData.data}/>
            <SeoText SEO_TEXT={ SEO_TEXT } SEO_TEXT_HTML={ SEO_TEXT_HTML } SEO_HEADING={ SEO_HEADING }/>
        </Suspense>
    );
}
