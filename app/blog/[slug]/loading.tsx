import React from 'react';

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="">
            <div
                className="w-full animate-pulse flex items-top gap-2 justify-between rounded-xl pt-[5px] mb-[36px] md:mb-[46px]">
                <div className="flex flex-col gap-4 w-20">
                    <div className="h-2 w-full rounded-md bg-gradient-to-r from-nch-800 to-nch-700"></div>
                </div>
            </div>
            {/*Featured banner*/ }
            {/*Main content*/ }
            <div className="flex flex-col md:flex-row gap-6">
                {/*Main content*/ }
                <div className="flex flex-col grow">
                    <div className="Content flex flex-col gap-[24px]">
                        <div
                            className="Img rounded-[12px] animate-pulse px-4 py-4 bg-gradient-to-r from-nch-900 to-nch-800 flex grow gap-[24px] h-[22vh] md:h-[30vh]"></div>
                        <div
                            className="HeadingWrap rounded-[12px] animate-pulse flex flex-col grow gap-[12px]">

                            <div className="w-1/5 h-3 bg-nch-700 rounded-xl"></div>

                            <div className="w-1/2 h-5 bg-nch-700 rounded-lg"></div>

                        </div>
                        <div
                            className="HeadingWrap rounded-[12px] animate-pulse flex flex-col grow gap-[12px]">
                            <div className="w-full h-3 bg-nch-700 rounded-xl"></div>
                            <div className="w-full h-3 bg-nch-700 rounded-xl"></div>
                            <div className="w-full h-3 bg-nch-700 rounded-xl"></div>
                            <div className="w-full h-3 bg-nch-700 rounded-xl"></div>
                            <div className="w-full h-3 bg-nch-700 rounded-xl"></div>
                            <div className="w-full h-3 bg-nch-700 rounded-xl"></div>
                            <div className="w-full h-3 bg-nch-700 rounded-xl"></div>
                            <div className="w-full h-3 bg-nch-700 rounded-xl"></div>
                        </div>
                    </div>
                </div>
                {/*Sidebar*/ }
                <div className="flex flex-col basis-[27vh] md:basis-[384px] bg-nch-900 rounded-[12px] px-4 py-6">
                </div>
            </div>
        </div>
    )
}