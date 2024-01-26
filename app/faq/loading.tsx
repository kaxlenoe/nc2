import { LoadingSkeleton } from '@/components/MatchesPage/components/LoadingSkeleton';
import React from 'react';

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="">
            <div
                className="w-full animate-pulse flex items-top gap-2 justify-between rounded-xl mt-[16px] md:mt-[6px] mb-[2px]">
                <div className="flex flex-col gap-4 w-20">
                    <div className="h-2 w-full rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                </div>
            </div>
            <div className="text-white text-[48px] font-bold select-none md:mt-[10px] ">F.A.Q.</div>
            <div className="select-none mb-[36px]">Frequently asked questions and answers.</div>
            {/*Featured banner*/ }
            {/*Main content*/ }
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col grow">
                    <div className="MatchFeed flex flex-col gap-4">
                        <div
                            className="MatchCard rounded-[12px] animate-pulse px-4 py-4 bg-gradient-to-r from-nch-900 to-nch-800">
                            <div className="flex items-center gap-2 justify-between">
                                <div className="flex items-center gap-2 w-full">
                                    <div
                                        className="h-8 w-8 rounded-md bg-gradient-to-r from-nch-800 to-nch-700 mr-2"></div>
                                    <div className="flex flex-col gap-2">
                                        <div
                                            className="h-4 min-w-[200px] rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="MatchCard rounded-[12px] animate-pulse px-4 py-4 bg-gradient-to-r from-nch-900 to-nch-800">
                            <div className="flex items-center gap-2 justify-between">
                                <div className="flex items-center gap-2 w-full">
                                    <div
                                        className="h-8 w-8 rounded-md bg-gradient-to-r from-nch-800 to-nch-700 mr-2"></div>
                                    <div className="flex flex-col gap-2">
                                        <div
                                            className="h-4 min-w-[200px] rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="MatchCard rounded-[12px] animate-pulse px-4 py-4 bg-gradient-to-r from-nch-900 to-nch-800">
                            <div className="flex items-center gap-2 justify-between">
                                <div className="flex items-center gap-2 w-full">
                                    <div
                                        className="h-8 w-8 rounded-md bg-gradient-to-r from-nch-800 to-nch-700 mr-2"></div>
                                    <div className="flex flex-col gap-2">
                                        <div
                                            className="h-4 min-w-[200px] rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="MatchCard rounded-[12px] animate-pulse px-4 py-4 bg-gradient-to-r from-nch-900 to-nch-800">
                            <div className="flex items-center gap-2 justify-between">
                                <div className="flex items-center gap-2 w-full">
                                    <div
                                        className="h-8 w-8 rounded-md bg-gradient-to-r from-nch-800 to-nch-700 mr-2"></div>
                                    <div className="flex flex-col gap-2">
                                        <div
                                            className="h-4 min-w-[200px] rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="MatchCard rounded-[12px] animate-pulse px-4 py-4 bg-gradient-to-r from-nch-900 to-nch-800">
                            <div className="flex items-center gap-2 justify-between">
                                <div className="flex items-center gap-2 w-full">
                                    <div
                                        className="h-8 w-8 rounded-md bg-gradient-to-r from-nch-800 to-nch-700 mr-2"></div>
                                    <div className="flex flex-col gap-2">
                                        <div
                                            className="h-4 min-w-[200px] rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="MatchCard rounded-[12px] animate-pulse px-4 py-4 bg-gradient-to-r from-nch-900 to-nch-800">
                            <div className="flex items-center gap-2 justify-between">
                                <div className="flex items-center gap-2 w-full">
                                    <div
                                        className="h-8 w-8 rounded-md bg-gradient-to-r from-nch-800 to-nch-700 mr-2"></div>
                                    <div className="flex flex-col gap-2">
                                        <div
                                            className="h-4 min-w-[200px] rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="MatchCard rounded-[12px] animate-pulse px-4 py-4 bg-gradient-to-r from-nch-900 to-nch-800">
                            <div className="flex items-center gap-2 justify-between">
                                <div className="flex items-center gap-2 w-full">
                                    <div
                                        className="h-8 w-8 rounded-md bg-gradient-to-r from-nch-800 to-nch-700 mr-2"></div>
                                    <div className="flex flex-col gap-2">
                                        <div
                                            className="h-4 min-w-[200px] rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                                    </div>
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