'use client';
import styles from './PicksPage.module.scss';
import { csgoIcon, dotaIcon, lolIcon } from '@/constants/StaticIcons';

import React, { FC } from 'react';
import { usePathname } from 'next/navigation';
import { GamesButtons } from '@/components/MatchesPage/components/GamesButtons';
import { PromoSideBanner } from '@/components/MatchesPage/components/PromoSideBanner';
import { Breadcrumbs } from '../Breadcrumbs';
import PicksCard from './components/PicksCard';

type PropsType = {
    dataPicks?: any;
    sidebarBannerData?: any;
};

const PicksPage: FC<PropsType> = ( {
    dataPicks,
    sidebarBannerData,
} ) => {

    const pathname = usePathname();
    const getCorrectTitleV2 = ( pathname: string ) => {
        const titles = {
            'counter-strike': `CS2 \\ CS:GO Picks`,
            'dota-2': 'Dota 2 picks',
            'league-of-legends': 'League of Legends picks',
        };
        const icons = {
            'counter-strike': csgoIcon,
            'dota-2': dotaIcon,
            'league-of-legends': lolIcon,
        };

        for ( const key in titles ) {
            if ( pathname.includes( key ) ) {
                return (
                    <>
                        <h1 className={ styles.picksPageTitle }>
                            <img
                                className={ styles.gameTitleIcon }
                                src={
                                    //@ts-ignore
                                    icons[ key ].src
                                }
                                alt=""
                            />
                            {
                                //@ts-ignore
                                titles[ key ]
                            }
                        </h1>
                    </>
                );
            }
        }

        if ( pathname.includes( '/picks' ) ) {
            return <h1 className={ styles.picksPageTitle }>Picks</h1>;
        }
        return (
            <>
            </>
        );
    };

    const returnTournamentsPlaceholder = () => {
        if ( !dataPicks?.length )
            return (
                <p className={ `h-36 rounded-[12px] bg-blend-colo flex justify-center items-center border-2 border-nch-800 text-nch-700 select-none px-[20px] text-sm md:text-normal` }>
                    No picks data available at the moment, please check back later.
                </p>
            );
    };

    return (
        <>
            <div className={ styles.wrapper }>
                <Breadcrumbs/>
                <div className={ styles.title }>{ getCorrectTitleV2( pathname ) }</div>
            </div>
            <h2 className={ styles.description }>
                Elevate Your Betting Game: AI Picks and Predictions on Neon Cheese.
            </h2>
            <div className="flex flex-col lg:flex-row gap-[24px] select-none mb-[40px] lg:mb-[60px]">
                <div className="flex flex-col flex-grow">
                    <div className={ styles.picksFeedHeader }>
                        <GamesButtons fromPicksPage={ true }/>
                    </div>
                    { !dataPicks?.length && ( <div>{ returnTournamentsPlaceholder() }</div> ) }

                    <div className={ styles.pickCardsWrapper }>
                        { dataPicks
                            ?.map( ( item: any, index: number ) => {
                                return (
                                    <PicksCard pickItem={ item } key={ index }/>
                                )
                            } )
                        }
                    </div>
                </div>
                <div className="flex flex-col min-w-[384px] basis-[100%] lg:basis-[384px]">
                    <PromoSideBanner sidebarLandingData={ sidebarBannerData }/>
                </div>
            </div>
        </>
    );
};

export default PicksPage;
