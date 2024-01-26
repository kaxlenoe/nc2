import { LoadingSkeleton } from '@/components/MatchesPage/components/LoadingSkeleton';
import React from 'react';

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="">
            <div
                className="w-full animate-pulse flex items-top gap-2 justify-between rounded-xl pt-[5px] mb-[1px] md:mb-[10px] mt-[11px] md:mt-[2px]">
                <div className="flex flex-col gap-4 w-20">
                    <div className="h-2 w-full rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                </div>
            </div>
            <div className="text-white text-[48px] font-bold select-none mb-[24px]">Blog</div>
            {/*Featured banner*/ }
            {/*Main content*/ }
            <div className="flex flex-col md:flex-row gap-6">
                {/*Main content*/ }
                <div className="flex flex-col grow">
                    <div className="BlogFeed flex flex-col gap-[24px]">
                        <div
                            className="BlogCard rounded-[12px] animate-pulse px-4 py-4 bg-gradient-to-r from-nch-900 to-nch-800 flex flex-col grow gap-[24px]">
                            <div className="flex items-center gap-[24px] justify-between">
                                <div className="w-full h-[250px] bg-nch-700 rounded-xl"></div>
                            </div>
                            <div className="flex flex-col gap-[12px] basis-full py-1">
                                <div className="w-1/5 h-2 bg-nch-700 rounded-xl"></div>
                                <div className="w-1/3 h-4 bg-nch-700 rounded-md"></div>
                                <div className="flex flex-col gap-[6px]">
                                    <div className="w-full h-2 bg-nch-700 rounded-xl"></div>
                                    <div className="w-full h-2 bg-nch-700 rounded-xl"></div>
                                    <div className="w-full h-2 bg-nch-700 rounded-xl"></div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="BlogCard rounded-[12px] animate-pulse px-4 py-4 bg-gradient-to-r from-nch-900 to-nch-800 flex flex-col grow gap-[24px]">
                            <div className="flex items-center gap-[24px] justify-between">
                                <div className="w-full h-[250px] bg-nch-700 rounded-xl"></div>
                            </div>
                            <div className="flex flex-col gap-[12px] basis-full py-1">
                                <div className="w-1/5 h-2 bg-nch-700 rounded-xl"></div>
                                <div className="w-1/3 h-4 bg-nch-700 rounded-md"></div>
                                <div className="flex flex-col gap-[6px]">
                                    <div className="w-full h-2 bg-nch-700 rounded-xl"></div>
                                    <div className="w-full h-2 bg-nch-700 rounded-xl"></div>
                                    <div className="w-full h-2 bg-nch-700 rounded-xl"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*Sidebar*/ }
                <div className="flex flex-col basis-[384px] bg-nch-900 rounded-[12px] px-4 py-6">
                </div>
            </div>
        </div>
    )
}