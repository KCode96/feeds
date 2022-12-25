import Link from 'next/link';
import React from 'react';
import { SlUserFollowing, SlUserUnfollow } from 'react-icons/sl';
import { RiHeart3Line } from 'react-icons/ri';

export default function ArticleHeader() {
    return (
        <div className="bg-[#333333]">
            <div className="container mx-auto py-6 md:py-8 lg:py-12">
                <h1 className="text-white/90 text-2xl font-semibold sm:text-3xl md:text-4xl">
                    Hello World Lorem ipsum dolor sit amet consectetur,
                    adipisicing elit. Error, ut.
                </h1>
                <div className="flex items-center justify-between mt-4 sm:mt-6">
                    <div className="flex items-center">
                        <Link href="">
                            <div className="h-[35px] w-[35px] rounded-full bg-blue-200"></div>
                        </Link>
                        <div className="ml-2">
                            <Link href="">
                                <h3 className=" text-sm text-white/90 transition hover:underline">
                                    Kaung Zaw
                                </h3>
                            </Link>
                            <div className="text-[11px] text-gray-400/80 font-light">
                                December 10, 2022
                            </div>
                        </div>
                        <button className="ml-4 flex items-center text-blue-500 border-blue-500 text-xs border px-2 py-1 rounded transition hover:bg-gray-600/10">
                            <SlUserFollowing />
                            <span className="ml-1">Follow</span>
                        </button>
                    </div>
                    <button className="flex items-center text-blue-500 border-blue-500 text-xs border px-2 py-1 rounded transition hover:bg-gray-600/10">
                        <RiHeart3Line />
                        <span className="ml-1">Favorite (99)</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
