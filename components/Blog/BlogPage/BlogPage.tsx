"use client";
import React, { FC } from 'react';
import { Archivo } from 'next/font/google';
import styles from './BlogPage.module.scss';
import { Breadcrumbs } from '../../Breadcrumbs';
import { PromoSideBanner } from '@/components/MatchesPage/components/PromoSideBanner';
import Link from 'next/link';
import { formatDate, getTodayString } from '@/utils/helpers';

const archivo = Archivo( { subsets: [ 'latin-ext' ] } );
interface BlogProps {
    articlesData?: any;
    sideBannerData?: any;
}
const BlogPage: FC<BlogProps>  = ( { articlesData, sideBannerData } ) => {
    return (
        <div className={ `${ styles.wrapper }` }>
            <Breadcrumbs current_item_heading="Blog"/>
            <h1 className={ `${ styles.title } ${ archivo.className }` }>Blog</h1>
            <div className={ styles.content_wrapper }>
                <div className={ styles.content }>
                    { articlesData
                        ?.map( ( article: any, index: number ) => {
                            let articleHeading = article.attributes.heading
                            let articleExcerpt = article.attributes.excerpt
                            let articleSlug = article.attributes.slug
                            let articleImageSrc = article.attributes.image.data.attributes.url
                            const formattedArticleDate = formatDate( article.attributes.createdAt );
                            return (
                                <Link href={ `/blog/${ articleSlug }` } key={ index } className={styles.article_card_wrapper}>
                                    <div className={styles.article_card_img}>
                                        <img src={ articleImageSrc } alt={`${articleHeading} image`}/>
                                    </div>
                                    <div className={ `${ styles.article_card_content } ${ archivo.className }` }>
                                        <div
                                            className={ styles.article_card_date }>{ getTodayString( formattedArticleDate ) }</div>
                                        <h3 className={ styles.article_card_heading }>{ articleHeading }</h3>
                                        <div className={ styles.article_card_excerpt }>{ articleExcerpt }</div>
                                    </div>
                                </Link>
                            )
                        } )
                    }
                </div>
                <div className={ styles.aside }>
                    <PromoSideBanner sidebarLandingData={ sideBannerData }/>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
