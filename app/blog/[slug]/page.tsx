import { getStrapiContentByPosition, strapiGetArticleBySlug } from '@/utils/strapi';
import { BlogSinglePage } from '@/components/Blog/BlogSinglePage';
export const revalidate = 0;

const BlogSingle = async ( { params }: { params: { slug: string } } ) => {
    const article = await strapiGetArticleBySlug( params.slug );

    const sideBannerData: any = await getStrapiContentByPosition( 'sidebar_blog_single' );
    return (
        <>
            <BlogSinglePage articleData={ article.data[ 0 ] } sideBannerData={ sideBannerData.data }/>
        </>
    );
};

export default BlogSingle;