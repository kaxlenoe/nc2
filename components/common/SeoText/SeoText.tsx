'use client';
import styles from './SeoText.module.scss';
import { FC } from 'react';

interface ISeoTextProps {
    SEO_TEXT?: string;
    SEO_HEADING?: string;
    SEO_TEXT_HTML?: string;
    isHeadingH1?: boolean;
}

const SeoText: FC<ISeoTextProps> = ( { SEO_TEXT, SEO_TEXT_HTML, SEO_HEADING, isHeadingH1 } ) => {

    return (
        <div className={ styles.wrapper }>
            {isHeadingH1 ? (
                <h1 className={ styles.title }>
                    { SEO_HEADING ? SEO_HEADING : 'Fallback SEO heading' }
                </h1>
            ) : (
                <h3 className={ styles.title }>
                    { SEO_HEADING ? SEO_HEADING : 'Fallback SEO heading' }
                </h3>
            ) }
            { SEO_TEXT && (
                <p>
                    { SEO_TEXT }
                </p>
            ) }
            { SEO_TEXT_HTML && (
                <div dangerouslySetInnerHTML={ { __html: SEO_TEXT_HTML } }></div>
            ) }
        </div>
    );
};

export default SeoText;
