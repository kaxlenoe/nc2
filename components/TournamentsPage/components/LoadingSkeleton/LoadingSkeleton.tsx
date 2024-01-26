'use client';

import styles from '@/app/page.module.scss';
import React, { FC, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { csgoIcon, dotaIcon, lolIcon, chevronRightIcon } from '@/constants/StaticIcons'
import Image from 'next/image';

const getCorrectTitleV2 = ( pathname: string ) => {
    const titles = {
        'counter-strike': `CS2 \\ CS:GO tournaments`,
        'dota-2': 'Dota 2 tournaments',
        'league-of-legends': 'League of Legends tournaments'
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

    if ( pathname.includes( '/tournaments' ) ) {
        return <h1 className={ styles.title_tournaments }>Tournaments</h1>;
    }

    return (
        <></>
    );
};

interface LoadingSkeletonProps {
    isMatches?: boolean;
}

//@ts-expect-error
const LoadingSkeleton:FC<LoadingSkeletonProps> = ( { isMatches } ): FC<LoadingSkeletonProps> => {
    const pathname = usePathname();
    //@ts-expect-error
    return (
        <div className={ `${ !isMatches ? `md:mt-[24px]` : `md:mt-0` } mt-[16px] select-none` }>
            { isMatches ? (
                <div
                    className="w-full animate-pulse flex items-top gap-2 justify-between rounded-xl mb-[17px] md:mb-[27px] md:mt-[6px]">
                    <div className="flex flex-col gap-4 w-20">
                        <div className="h-2 w-full rounded-md bg-gradient-to-r from-nch-900 to-nch-800"></div>
                    </div>
                </div>
            ) : null
            }
            <h1 className="text-white text-[18px] md:text-3xl">{ getCorrectTitleV2( pathname ) }</h1>
            <h2 className="hidden md:block mt-[28px] md:mt-[23px] md:mb-[34px] font-normal text-[16px] select-none">Explore latest upcoming tournaments and leagues
            </h2>

            <div
                className="md:hidden w-full animate-pulse flex items-top gap-2 justify-between rounded-xl mt-[16px] mb-[13px] md:mb-[27px] md:mt-[6px]">
                <div className="flex flex-col gap-4 w-1/2">
                    <div className="h-2 w-full rounded-md bg-gradient-to-r from-nch-900 to-nch-800"></div>
                </div>
            </div>
            {/*Main content*/ }
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col grow mt-[12px]">
                    <div className="w-full flex flex-col md:flex-row gap-2 justify-between rounded-xl">
                        <div className="flex gap-2">
                            <div className="h-10 w-10 rounded-full bg-nch-900"></div>
                            <div className="h-10 w-10 rounded-full bg-nch-900"></div>
                            <div className="h-10 w-10 rounded-full bg-nch-900"></div>
                            <div className="h-10 w-28 rounded-xl bg-nch-900"></div>
                        </div>
                        <div className="w-full md:w-1/3 flex items-center gap-2 justify-between rounded-xl mt-[12px] md:mt-0">
                            <div className="w-full flex gap-2 md:items-end">
                                <div className="h-10 w-full rounded-full bg-nch-900"></div>
                            </div>
                        </div>
                    </div>
                    <div className="MatchFeed flex flex-col mt-[22px] gap-[10px]">
                        {/*Match Card*/ }
                        <div
                            className="MatchCard rounded-[12px] animate-pulse px-4 py-[21px] bg-gradient-to-r from-nch-900 to-nch-800">
                        <div className="flex justify-between items-center">
                                <div
                                    className="h-3 w-1/3 rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                                <div className="h-6 w-6 rounded-md bg-gradient-to-r from-nch-700 to-nch-600"></div>
                                <div className={ 'opacity-50' }>
                                    <Image src={ chevronRightIcon } width={ 16 } height={ 16 } alt={ `` }
                                           objectFit={ `contain` }/>
                                </div>
                            </div>
                        </div>
                        {/*Match Card*/ }
                        <div
                            className="MatchCard rounded-[12px] animate-pulse px-4 py-[21px] bg-gradient-to-r from-nch-900 to-nch-800">
                            <div className="flex justify-between items-center">
                                <div
                                    className="h-3 w-1/3 rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                                <div className="h-6 w-6 rounded-md bg-gradient-to-r from-nch-700 to-nch-600"></div>
                                <div className={ 'opacity-50' }>
                                    <Image src={ chevronRightIcon } width={ 16 } height={ 16 } alt={ `` }
                                           objectFit={ `contain` }/>
                                </div>
                            </div>
                        </div>
                        {/*Match Card*/ }
                        <div
                            className="MatchCard rounded-[12px] animate-pulse px-4 py-[21px] bg-gradient-to-r from-nch-900 to-nch-800">
                            <div className="flex justify-between items-center">
                                <div
                                    className="h-3 w-1/3 rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                                <div className="h-6 w-6 rounded-md bg-gradient-to-r from-nch-700 to-nch-600"></div>
                                <div className={ 'opacity-50' }>
                                    <Image src={ chevronRightIcon } width={ 16 } height={ 16 } alt={ `` }
                                           objectFit={ `contain` }/>
                                </div>
                            </div>
                        </div>
                        {/*Match Card*/ }
                        <div
                            className="MatchCard rounded-[12px] animate-pulse px-4 py-[21px] bg-gradient-to-r from-nch-900 to-nch-800">
                            <div className="flex justify-between items-center">
                                <div
                                    className="h-3 w-1/3 rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                                <div className="h-6 w-6 rounded-md bg-gradient-to-r from-nch-700 to-nch-600"></div>
                                <div className={ 'opacity-50' }>
                                    <Image src={ chevronRightIcon } width={ 16 } height={ 16 } alt={ `` }
                                           objectFit={ `contain` }/>
                                </div>
                            </div>
                        </div>
                        {/*Match Card*/ }
                        <div
                            className="MatchCard rounded-[12px] animate-pulse px-4 py-[21px] bg-gradient-to-r from-nch-900 to-nch-800">
                            <div className="flex justify-between items-center">
                                <div
                                    className="h-3 w-1/3 rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                                <div className="h-6 w-6 rounded-md bg-gradient-to-r from-nch-700 to-nch-600"></div>
                                <div className={ 'opacity-50' }>
                                    <Image src={ chevronRightIcon } width={ 16 } height={ 16 } alt={ `` }
                                           objectFit={ `contain` }/>
                                </div>
                            </div>
                        </div>
                        {/*Match Card*/ }
                        <div
                            className="MatchCard rounded-[12px] animate-pulse px-4 py-[21px] bg-gradient-to-r from-nch-900 to-nch-800">
                            <div className="flex justify-between items-center">
                                <div
                                    className="h-3 w-1/3 rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                                <div className="h-6 w-6 rounded-md bg-gradient-to-r from-nch-700 to-nch-600"></div>
                                <div className={ 'opacity-50' }>
                                    <Image src={ chevronRightIcon } width={ 16 } height={ 16 } alt={ `` }
                                           objectFit={ `contain` }/>
                                </div>
                            </div>
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
