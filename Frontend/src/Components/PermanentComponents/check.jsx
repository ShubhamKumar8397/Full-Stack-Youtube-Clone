import React from 'react'
import { Outlet } from 'react-router-dom'
import SideVideo from '../SideVideo'
import Comment from '../Comment'

const Check = () => {
    return (
        <section>
            <div class="flex  w-full flex-wrap  gap-4 p-4 lg:flex-nowrap">
                <div class="col-span-12 w-full">
                    {/* video part */}
                    <div class="relative mb-4 w-full pt-[56%]">
                        <div class="absolute inset-0">
                            <video
                                class="h-full w-full"
                                controls=""
                                autoplay=""
                                muted="">
                                <source
                                    src="https://res.cloudinary.com/dfw5nnic5/video/upload/v1695117968/Sample_1280x720_mp4_b4db0s.mp4"
                                    type="video/mp4" />
                            </video>
                        </div>
                    </div>
                    <div
                        class="group mb-4 w-full rounded-lg border p-4 duration-200 hover:bg-white/5 focus:bg-white/5"
                        role="button"
                        tabindex="0">
                        <div class="flex flex-wrap gap-y-2">
                            <div class="w-full md:w-1/2 lg:w-full xl:w-1/2">
                                <h1 class="text-lg font-bold">Advanced React Patterns</h1>
                                <p class="flex text-sm text-gray-200">30,164 Views ·18 hours ago</p>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-full xl:w-1/2">
                                <div class="flex items-center justify-between gap-x-4 md:justify-end lg:justify-between xl:justify-end">
                                    <div class="flex overflow-hidden rounded-lg border">

                                        {/* for likes button */}

                                        <button
                                            class="group/btn flex items-center gap-x-2 border-r border-gray-700 px-4 py-1.5 after:content-[attr(data-like)] hover:bg-white/10 focus:after:content-[attr(data-like-alt)]"
                                            data-like="3050"
                                            data-like-alt="3051">
                                            <span class="inline-block w-5 group-focus/btn:text-[#ae7aff]">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    aria-hidden="true">
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"></path>
                                                </svg>
                                            </span>
                                        </button>
                                        <button
                                            class="group/btn flex items-center gap-x-2 px-4 py-1.5 after:content-[attr(data-like)] hover:bg-white/10 focus:after:content-[attr(data-like-alt)]"
                                            data-like="20"
                                            data-like-alt="21">
                                            <span class="inline-block w-5 group-focus/btn:text-[#ae7aff]">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    aria-hidden="true">
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"></path>
                                                </svg>
                                            </span>
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="mt-4 flex items-center justify-between">
                            <div class="flex items-center gap-x-4">
                                <div class="mt-2 h-12 w-12 shrink-0">
                                    <img
                                        src="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                        alt="reactpatterns"
                                        class="h-full w-full rounded-full" />
                                </div>
                                <div class="block">
                                    <p class="text-gray-200">React Patterns</p>
                                    <p class="text-sm text-gray-400">757K Subscribers</p>
                                </div>
                            </div>
                            <div class="block">
                                <button
                                    class="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto">
                                    <span class="inline-block w-5">

                                    </span>
                                    <span class="group-focus /btn:hidden">Subscribe</span>
                                    <span class="hidden group-focus/btn:block">Subscribed</span>
                                </button>
                            </div>
                        </div>
                        <hr class="my-4 border-white" />
                        <div class="h-5 overflow-hidden group-focus:h-auto">
                            <p class="text-sm">
                                🚀 Dive into the world of React with our latest tutorial series: &quot;Advanced React Patterns&quot;! 🛠️ Whether you&#x27;re a seasoned developer or just starting out, this series is
                                designed to elevate your React skills to the next level.
                            </p>
                        </div>
                    </div>
                    <button class="peer w-full rounded-lg border p-4 text-left duration-200 hover:bg-white/5 focus:bg-white/5 sm:hidden"><h6 class="font-semibold">573 Comments...</h6></button>
                    <div
                        class="fixed inset-x-0 top-full z-[60] h-[calc(100%-69px)] overflow-auto rounded-lg border bg-[#121212] p-4 duration-200 hover:top-[67px] peer-focus:top-[67px] sm:static sm:h-auto sm:max-h-[500px] lg:max-h-none">
                        <div class="block">
                            <h6 class="mb-4 font-semibold">573 Comments</h6>
                            <input
                                type="text"
                                class="w-full rounded-lg border bg-transparent px-2 py-1 placeholder-white"
                                placeholder="Add a Comment" />
                        </div>
                        <hr class="my-4 border-white" />-
                        <Comment />

                    </div>
                </div>

                <div class="col-span-12 flex w-full shrink-0 flex-col gap-3 lg:w-[350px] xl:w-[400px]">
                    <SideVideo />
                </div>
            </div>
        </section >

    )
}

export default Check