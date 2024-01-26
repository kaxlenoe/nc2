'use client';
import styles from './FAQ.module.scss';
import * as Accordion from '@radix-ui/react-accordion';
import { Breadcrumbs } from '../Breadcrumbs';
import { Archivo } from 'next/font/google';
import accordionChevron from '@/public/icons/accordion-chevron.svg'
import React, { FC } from 'react';
import { PromoSideBanner } from '@/components/MatchesPage/components/PromoSideBanner';

const archivo = Archivo( { subsets: [ 'latin-ext' ] } );

interface FaqProps {
    questionsData?: any;
    sideBannerData?: any;
}

const FaqPage: FC<FaqProps> = ( { questionsData, sideBannerData } ) => {
    return (
        <div className={ `${ styles.wrapper }` }>
            <Breadcrumbs current_item_heading="F.A.Q."/>
            <h1 className={ `${ styles.title } ${ archivo.className }` }>F.A.Q.</h1>
            <h2 className={ styles.subtitle }>Frequently asked questions and answers.</h2>
            <div className={ styles.content_wrapper }>
                <div className={styles.content}>
                <Accordion.Root className={ `${ styles.accordionRoot }` } type="single" collapsible>
                    {
                        questionsData?.map( ( question: any, index: number ) => {
                            let questionHeading = question.attributes.heading
                            let questionText = question.attributes.question_html
                            return (
                                <Accordion.Item className={ `${ styles.accordionItem }` } value={ `${ index + 1 } ` }
                                                key={ index }>
                                    <Accordion.Header className={ `${ styles.accordionHeader }` }>
                                        <Accordion.Trigger className={ `${ styles.accordionTrigger }` }>
                                            <span className={ `${ archivo.className }` }>{ questionHeading }</span>
                                            <img src={ accordionChevron.src }
                                                 className={ `AccordionChevron ${ styles.accordionChevron }` }
                                                 alt="Show"/>
                                        </Accordion.Trigger>
                                    </Accordion.Header>
                                    <Accordion.Content className={ `${ styles.accordionContent }` }>
                                        <div className={ styles.accordionContentText }
                                             dangerouslySetInnerHTML={ { __html: questionText } }>
                                        </div>
                                    </Accordion.Content>
                                </Accordion.Item>
                            )
                        } )
                    }
                </Accordion.Root>
                </div>
                <div className={styles.aside}>
                    <PromoSideBanner sidebarLandingData={sideBannerData} />
                </div>
            </div>
        </div>
    );
};

export default FaqPage;
