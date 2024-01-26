import { LoadingSkeleton } from '@/components/MatchesPage/components/LoadingSkeleton';
import React from 'react';

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="">
            <div
                className="w-full animate-pulse flex items-top gap-2 justify-between rounded-xl pt-[5px] mb-[15px] mt-[11px] md:mt-0 md:mb-[28px]">
                <div className="flex flex-col gap-4 w-20">
                    <div className="h-2 w-full rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                </div>
            </div>
            <div className="text-white text-[48px] font-bold select-none mb-[22px] leading-[.9em]">Free Bets &
                Promotions
            </div>
            <div className="text-white select-none mb-[30px] leading-[1.2em]">Exclusive Deals, Bonuses, and Offers from
                Top Bookies.
                Maximize Your Winnings with Unbeatable Promotions.
            </div>
            {/*Featured banner*/ }
            {/*Main content*/ }
            <div className="flex flex-wrap gap-[24px]">
                {/*Main content*/ }
                <div className="flex flex-col grow animate-pulse">
                    <div className="flex gap-[12px]">
                        <div className="w-32 h-[40px] bg-nch-800 rounded-lg"></div>
                        <div className="w-32 h-[40px] bg-nch-800 rounded-lg"></div>
                    </div>
                    <div className="flex flex-wrap gap-[2vw] mt-[24px]">
                        <div
                            className="w-1/2 h-[300px] bg-nch-700 rounded-xl bg-gradient-to-r from-nch-800 to-nch-700 basis-[100%] md:basis-[48%]"></div>
                        <div
                            className="w-1/2 h-[300px] bg-nch-700 rounded-xl bg-gradient-to-r from-nch-800 to-nch-700 basis-[100%] md:basis-[48%]"></div>
                        <div
                            className="w-1/2 h-[300px] bg-nch-700 rounded-xl bg-gradient-to-r from-nch-800 to-nch-700 basis-[100%] md:basis-[48%]"></div>
                        <div
                            className="w-1/2 h-[300px] bg-nch-700 rounded-xl bg-gradient-to-r from-nch-800 to-nch-700 basis-[100%] md:basis-[48%]"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}