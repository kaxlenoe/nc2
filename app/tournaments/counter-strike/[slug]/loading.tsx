import React from 'react';

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="mt-[16px] md:mt-[6px]">
            <div className="w-full flex items-top gap-2 justify-between rounded-xl mb-[18px] md:mb-[40px]">
                <div className="flex flex-col gap-4 w-1/3">
                    <div className="h-2 w-full rounded-md bg-nch-900"></div>
                </div>
            </div>

            <div className="w-full flex items-top gap-2 justify-between rounded-xl mb-[20px] md:mb-[30px]">
                <div className="flex items-center gap-4 w-full">
                    <div className="h-[48px] w-[48px] rounded-md bg-nch-900"></div>
                    <div className="h-[48px] w-1/2 rounded-md bg-nch-900"></div>
                </div>
            </div>
            {/*Main content*/ }
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col grow">
                    <div className="w-full flex items-center gap-2 justify-between rounded-xl mb-[36px] md:mb-[46px]">
                        <div className="flex gap-2">
                            <div className="h-10 w-10 rounded-full bg-nch-900"></div>
                            <div className="h-10 w-10 rounded-full bg-nch-900"></div>
                            <div className="h-10 w-10 rounded-full bg-nch-900"></div>
                            <div className="h-10 w-28 rounded-full bg-nch-900"></div>
                        </div>
                    </div>

                    <div
                        className="w-full flex flex-col md:flex-row items-start md:items-center gap-[28px] md:gap-2 justify-between rounded-xl mb-[20px]">
                        <div className="flex gap-2">
                            <div className="h-10 w-24 rounded-xl bg-nch-900"></div>
                            <div className="h-10 w-24 rounded-xl bg-nch-900"></div>
                            <div className="h-10 w-24 rounded-xl bg-nch-900"></div>
                        </div>
                        <div className="flex gap-2">
                            <div className="h-5 w-40 rounded-xl bg-nch-900"></div>
                        </div>
                    </div>

                    <div className="MatchFeed flex flex-col mt-[4px] md:mt-6 gap-[20px] md:gap-4">
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
                </div>
            </div>
        </div>
    )
}