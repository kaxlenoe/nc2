'use client';

import styles from '@/app/page.module.scss';
import React, { FC, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { csgoIcon, dotaIcon, lolIcon, notFoundIcon } from '@/constants/StaticIcons'

const getCorrectTitleV2 = ( pathname: string ) => {
    const titles = {
        'counter-strike': `CS2 \\ CS:GO matches`,
        'dota-2': 'Dota 2 matches',
        'league-of-legends': 'League of Legends matches'
    };
    const icons = {
        'counter-strike': csgoIcon,
        'dota-2': dotaIcon,
        'league-of-legends': lolIcon
    }

    for ( const key in titles ) {
        if ( pathname.includes( key ) ) {
            return (
                <>
                    <h1 className={ styles.title }>

                        <img
                            className={ styles.gameIcon }
                            src={
                                //@ts-ignore
                                icons[ key ].src } alt=""
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

    if ( pathname.includes( '/matches' ) ) {
        return <h1 className={ styles.title }>Matches</h1>;
    }

    return (
        <div style={ { display: 'flex' } }>
            <h2 className={ `${styles.subTitle}` }><span className={ ` ${styles.mainHeading} font-bold mr-[11px]` }>Neon Cheese</span>— your AI eSport
                betting
                companion</h2>
        </div>
    );
};

interface LoadingSkeletonProps {
    isMatches?: boolean;
}

//@ts-expect-error
const LoadingSkeleton: FC<LoadingSkeletonProps> = ( { isMatches } ): FC<LoadingSkeletonProps> => {
    const pathname = usePathname();
    //@ts-expect-error
    return (
        <div className={ `${ !isMatches ? `md:mt-[20px]`:`md:mt-0`} select-none` }>
            { isMatches ? (
                <div className="w-full animate-pulse flex items-top gap-2 justify-between rounded-xl mb-[16px] md:mb-[27px] md:mt-[6px]">
                    <div className="flex flex-col gap-4 w-20">
                        <div className="h-2 w-full rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                    </div>
                </div>
            ) : null
            }
            <h1 className="text-white md:text-3xl">{ getCorrectTitleV2( pathname ) }</h1>
            <h2 className="hidden md:block mt-[28px] md:mt-[23px] font-normal text-[16px] select-none">Up-to-the-Minute Match Feeds and Real-Time Odds. Stay Ahead of the Game!
            </h2>
            {/*Featured banner*/ }
            <div
                className="FeaturedBanner flex flex-col w-full flex-1 mt-[17px] md:mt-[44px] bg-nch-900 rounded-[12px] px-4 py-[22px] md:py-[58px] relative mb-[29px] md:mb-[38px]">
                <div className="w-full animate-pulse flex items-top gap-2 justify-between rounded-xl">
                    <div className="flex flex-col gap-2 w-1/2">
                        <div className="h-2 w-full rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                        <div className="h-2 w-2/3 rounded-md bg-gradient-to-r from-nch-900 to-nch-700"></div>
                    </div>

                    <div className="h-8 w-1/4 rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                </div>
                <div className="w-1/2 animate-pulse flex gap-4 items-center rounded-xl mt-[30px]">
                    <div className="h-7 w-[130px] rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                    <div className="h-2 w-[130px] rounded-md bg-gradient-to-r from-nch-900 to-nch-800"></div>
                </div>
                {/*Banner dots*/ }
                <div
                    className="flex animate-pulse items-center gap-1 justify-center py-2 absolute right-6 bottom-4 z-20">
                    <div className="h-2 w-2 rounded-md bg-nch-600"></div>
                    <div className="h-2 w-2 rounded-md bg-nch-800"></div>
                    <div className="h-2 w-2 rounded-md bg-nch-800"></div>
                </div>
            </div>
            {/*Main content*/ }
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col grow">
                    <div className="w-full flex flex-col md:flex-row md:items-center gap-[34px] md:gap-2 mb-[13px] md:mt-[9px] justify-between rounded-xl">
                        <div className="h-3 w-1/3 rounded-md bg-gradient-to-r from-nch-900 to-nch-900"></div>
                        <div className="flex gap-2 justify-between">
                            <div className="flex gap-2">
                                <div className="h-8 w-8 rounded-full bg-nch-900"></div>
                                <div className="h-8 w-8 rounded-full bg-nch-900"></div>
                                <div className="h-8 w-8 rounded-full bg-nch-900"></div>
                            </div>
                            <div className="h-8 w-28 rounded-xl bg-nch-900"></div>
                        </div>
                    </div>
                    <div className="w-full flex items-center gap-2 rounded-xl mt-4">
                        <div className="h-4 w-1/3 rounded-md bg-nch-900"></div>
                    </div>

                    <div className="MatchFeed flex flex-col mt-6 md:mt-[30px] gap-4">
                        <div
                            className="MatchCard rounded-[12px] animate-pulse px-4 py-6 bg-gradient-to-r from-nch-900 to-nch-800">
                            <div className="flex justify-between">
                                <div
                                    className="h-3 w-1/3 rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                                <div className="h-3 w-20 rounded-md bg-gradient-to-r from-nch-700 to-nch-600"></div>
                            </div>
                            <div className="flex items-center gap-2 mt-6 justify-between">
                                <div className="flex items-center gap-2 w-full">
                                    <div
                                        className="h-6 w-12 rounded-md bg-gradient-to-r from-nch-800 to-nch-700 mr-2"></div>
                                    <div className="flex flex-col gap-2">
                                        <div
                                            className="h-4 w-4 rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                                        <div
                                            className="h-4 w-4 rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div
                                            className="h-4 w-28 rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                                        <div
                                            className="h-4 w-28 rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div
                                        className="h-6 w-20 rounded-md bg-gradient-to-r from-nch-700 to-nch-600"></div>
                                    <div
                                        className="h-6 w-20 rounded-md bg-gradient-to-r from-nch-700 to-nch-600"></div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="MatchCard rounded-[12px] animate-pulse px-4 py-6 bg-gradient-to-r from-nch-900 to-nch-800">
                            <div className="flex justify-between">
                                <div
                                    className="h-3 w-1/3 rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                                <div className="h-3 w-20 rounded-md bg-gradient-to-r from-nch-700 to-nch-600"></div>
                            </div>
                            <div className="flex items-center gap-2 mt-6 justify-between">
                                <div className="flex items-center gap-2 w-full">
                                    <div
                                        className="h-6 w-12 rounded-md bg-gradient-to-r from-nch-800 to-nch-700 mr-2"></div>
                                    <div className="flex flex-col gap-2">
                                        <div
                                            className="h-4 w-4 rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                                        <div
                                            className="h-4 w-4 rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div
                                            className="h-4 w-28 rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                                        <div
                                            className="h-4 w-28 rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div
                                        className="h-6 w-20 rounded-md bg-gradient-to-r from-nch-700 to-nch-600"></div>
                                    <div
                                        className="h-6 w-20 rounded-md bg-gradient-to-r from-nch-700 to-nch-600"></div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="MatchCard rounded-[12px] animate-pulse px-4 py-6 bg-gradient-to-r from-nch-900 to-nch-800">
                            <div className="flex justify-between">
                                <div
                                    className="h-3 w-1/3 rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                                <div className="h-3 w-20 rounded-md bg-gradient-to-r from-nch-700 to-nch-600"></div>
                            </div>
                            <div className="flex items-center gap-2 mt-6 justify-between">
                                <div className="flex items-center gap-2 w-full">
                                    <div
                                        className="h-6 w-12 rounded-md bg-gradient-to-r from-nch-800 to-nch-700 mr-2"></div>
                                    <div className="flex flex-col gap-2">
                                        <div
                                            className="h-4 w-4 rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                                        <div
                                            className="h-4 w-4 rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div
                                            className="h-4 w-28 rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                                        <div
                                            className="h-4 w-28 rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div
                                        className="h-6 w-20 rounded-md bg-gradient-to-r from-nch-700 to-nch-600"></div>
                                    <div
                                        className="h-6 w-20 rounded-md bg-gradient-to-r from-nch-700 to-nch-600"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*Sidebar*/ }
                <div className="flex flex-col basis-[384px] bg-nch-900 rounded-[12px] px-4 py-6">
                    <div className="w-full flex items-top gap-2 justify-between rounded-xl">
                        <div className="h-3 w-1/2 rounded-md bg-gradient-to-r from-nch-800 to-nch-800"></div>
                    </div>
                    <div
                        className="w-full animate-pulse flex flex-col items-top gap-3 justify-between rounded-xl mt-6">
                        <div className="h-10 w-full rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                        <div className="h-10 w-full rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                        <div className="h-10 w-full rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                        <div className="h-10 w-full rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                        <div className="h-10 w-full rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                        <div className="h-10 w-full rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                        <div className="h-10 w-full rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                        <div className="h-10 w-full rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingSkeleton;
