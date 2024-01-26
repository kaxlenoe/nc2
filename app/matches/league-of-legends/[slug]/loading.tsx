import React from 'react';

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="mt-[16px] md:mt-[6px]">
            {/*Breadcrumbs*/ }
            <div className="w-full animate-pulse flex items-top gap-2 justify-between rounded-xl">
                <div className="flex flex-col gap-4 w-2/3">
                    <div className="h-2 w-1/4 rounded-md bg-nch-800"></div>
                </div>
            </div>

            {/*<div className="text-white text-3xl">{ "CS MATCH LOADING" }</div>*/ }
            {/*<div className="mt-4">Up-to-the-Minute Match Feeds and Real-Time Odds. Stay Ahead of the Game!</div>*/ }
            {/*Featured banner*/ }
            <div
                className="FeaturedBanner animate-pulse flex flex-col w-full flex-1 bg-nch-900 rounded-[12px] mt-[26px] md:mt-[26px] px-4 py-4 md:py-8 mb-[48px] md:mb-[26px]">
                <div className="w-full flex items-top gap-2 justify-around rounded-xl">
                    <div className="flex justify-center items-center gap-2">
                        <div
                            className="bg-nch-800 rounded-[12px] w-[150px] h-[10px]  md:h-[12px] mb-6"></div>
                        <div
                            className="bg-nch-800 rounded-[6px] w-[30px] h-[20px] md:w-[40px] md:h-[20px] mb-6"></div>
                    </div>
                </div>
                <div className="w-full flex items-top gap-2 justify-around rounded-xl">
                    <div className="flex flex-col justify-center items-center gap-[20px]">
                        <div className="bg-nch-800 rounded-[12px] w-[40px] h-[40px] md:w-[60px] md:h-[60px]"></div>
                        <div className="bg-nch-800 rounded-[12px] w-[80px] h-[10px] md:w-[150px] md:h-[20px]"></div>
                        <div
                            className="bg-nch-800 rounded-[12px] my-4 w-[60px] h-[70px] md:w-[150px] md:h-[40px]"></div>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-2">
                        <div className="bg-nch-800 rounded-[12px] w-[40px] h-[10px] md:w-[100px] md:h-[30px]"></div>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-[20px]">
                        <div className="bg-nch-800 rounded-[12px] w-[40px] h-[40px] md:w-[60px] md:h-[60px]"></div>
                        <div className="bg-nch-800 rounded-[12px] w-[80px] h-[10px] md:w-[150px] md:h-[20px]"></div>
                        <div
                            className="bg-nch-800 rounded-[12px] my-4 w-[60px] h-[70px] md:w-[150px] md:h-[40px]"></div>
                    </div>
                </div>
            </div>
            {/*Main content*/ }
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col grow animate-pulse">
                    <div className="bg-nch-800 rounded-[12px] w-[150px] h-4 mb-[30px] md:mb-[26px]"></div>

                    {/*Predictions block*/ }
                    <div
                        className="bg-nch-900 rounded-[12px] flex flex-col items-center justify-center w-full h-[320px] mb-[20px]">
                    </div>
                    <div className="bg-nch-800 rounded-[12px] w-[150px] h-4 mb-4"></div>
                    {/*Predictions block*/ }
                    <div
                        className="bg-nch-900 rounded-[12px] flex flex-col items-center justify-center w-full h-[100px]">
                        <div className="flex w-full justify-between mb-2">
                            <div className="bg-nch-800 rounded-[4px] w-8 h-4 ml-2"></div>
                            <div className="bg-nch-800 rounded-[4px] w-8 h-4 mr-2"></div>
                        </div>
                        <div className="flex w-full">
                            <div className="bg-nch-800 rounded-[12px] w-1/3 h-2 ml-2">
                            </div>
                            <div className="bg-nch-800 rounded-[12px] w-2/3 h-2 mr-2">
                            </div>
                        </div>
                    </div>
                </div>
                {/*Sidebar*/ }

                <div className={ 'flex flex-col basis-[384px] animate-pulse' }>
                    <div className="bg-nch-800 rounded-[12px] w-[150px] h-4 mb-4"></div>
                    <div className="flex flex-col bg-nch-900 rounded-[12px] px-4 py-6 ">

                        <div className="w-full flex items-top gap-2 justify-between rounded-xl">
                            <div className="h-3 w-1/2 rounded-md bg-gradient-to-r from-nch-800 to-nch-800"></div>
                        </div>
                        <div className="w-full flex flex-col items-top gap-3 justify-between rounded-xl mt-6">
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
        </div>
    )
}