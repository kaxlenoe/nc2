'use client';
import React, { FC } from 'react';
import { Archivo } from 'next/font/google';
import styles from './BlogSinglePage.module.scss';
import { Breadcrumbs } from '../../Breadcrumbs';
import { PromoSideBanner } from '@/components/MatchesPage/components/PromoSideBanner';
import { formatDate, getTodayString } from '@/utils/helpers';

const archivo = Archivo( { subsets: [ 'latin-ext' ] } );

interface BlogSingleProps {
    articleData?: any;
    sideBannerData?: any;
}

const BlogSinglePage: FC<BlogSingleProps> = ( { articleData, sideBannerData } ) => {
    const articleImgSrc = articleData.attributes.image.data.attributes.url || ''
    const articleHeading = articleData.attributes.heading
    const formattedArticleDate = getTodayString( formatDate( articleData.attributes.createdAt ));
    const articleContentHtml = articleData.attributes.content_html
    return (
        <div className={ `${ styles.wrapper }` }>
            <Breadcrumbs current_item_heading={ articleHeading }/>
            <div className={ styles.content_wrapper }>
                <div className={ `${styles.content} ${archivo.className}` }>
                    <div className={ styles.article_img }>
                        <img src={ articleImgSrc } alt={ `${ articleHeading } image` }/>
                    </div>
                    <div className={ styles.article_heading_wrapper }>
                        <div className={ styles.article_date }>{ formattedArticleDate }</div>
                        <h1 className={ styles.article_heading }>{ articleHeading }</h1>
                    </div>
                    <div className={ styles.article_content }
                         dangerouslySetInnerHTML={ { __html: articleContentHtml } }></div>
                </div>
                <div className={ styles.aside }>
                    <PromoSideBanner sidebarLandingData={ sideBannerData }/>
                </div>
            </div>
        </div>
    );
};

export default BlogSinglePage;
