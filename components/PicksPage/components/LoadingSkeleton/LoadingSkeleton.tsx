'use client';

import styles from '@/app/page.module.scss';
import React, { FC } from 'react';
import { usePathname } from 'next/navigation';
import { chevronRightIcon, csgoIcon, dotaIcon, lolIcon } from '@/constants/StaticIcons'
import Image from 'next/image';

const getCorrectTitleV2 = ( pathname: string ) => {
    const titles = {
        'counter-strike': `CS2 \\ CS:GO picks`,
        'dota-2': 'Dota 2 picks',
        'league-of-legends': 'League of Legends picks'
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
                    <h1 className={ styles.title_tournaments }>

                        <img
                            className={ styles.gameIcon_tournaments }
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

    if ( pathname.includes( '/picks' ) ) {
        return <h1 className={ styles.title_tournaments }>Picks</h1>;
    }

    return (
        <></>
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
        <div className={ `${ !isMatches ? `md:mt-[24px]` : `md:mt-0` } mt-[16px] select-none` }>
            <div
                className="w-full animate-pulse flex items-top gap-2 justify-between rounded-xl mb-[17px] md:mb-[27px] md:mt-[6px]">
                <div className="flex flex-col gap-4 w-20">
                    <div className="h-2 w-full rounded-md bg-gradient-to-r from-nch-900 to-nch-800"></div>
                </div>
            </div>
            <h1 className="text-white text-[18px] md:text-3xl">{ getCorrectTitleV2( pathname ) }</h1>
            <h2 className="hidden md:block mt-[28px] md:mt-[23px] md:mb-[34px] font-normal text-[16px] select-none">Elevate
                Your Betting Game: AI Picks and Predictions on Neon Cheese.
            </h2>

            {/*Main content*/ }
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col grow mt-[12px] md:mt-[10px]">
                    <div className="w-full flex flex-col md:flex-row gap-2 justify-between rounded-xl">
                        <div className="flex gap-2">
                            <div className="h-10 w-10 rounded-full bg-nch-900"></div>
                            <div className="h-10 w-10 rounded-full bg-nch-900"></div>
                            <div className="h-10 w-10 rounded-full bg-nch-900"></div>
                            <div className="h-10 w-28 rounded-xl bg-nch-900"></div>
                        </div>
                    </div>
                    <div className="MatchFeed flex flex-col mt-[17px] gap-[20px]">
                        {/*Match Card*/ }
                        <div
                            className="MatchCard rounded-[12px] animate-pulse px-4 py-[133px] md:py-[107px] bg-gradient-to-r from-nch-900 to-nch-800">
                        </div>
                        {/*Match Card*/ }
                        <div
                            className="MatchCard rounded-[12px] animate-pulse px-4 py-[133px] md:py-[107px] bg-gradient-to-r from-nch-900 to-nch-800">
                        </div>
                        {/*Match Card*/ }
                        <div
                            className="MatchCard rounded-[12px] animate-pulse px-4 py-[133px] md:py-[107px] bg-gradient-to-r from-nch-900 to-nch-800">
                        </div>
                    </div>
                </div>
                {/*Sidebar*/ }
                <div className="flex flex-col basis-[384px] bg-nch-900 rounded-[12px] px-4 py-6">
                    <div
                        className="w-full animate-pulse flex flex-col items-top gap-3 justify-between rounded-xl mt-6">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingSkeleton;
