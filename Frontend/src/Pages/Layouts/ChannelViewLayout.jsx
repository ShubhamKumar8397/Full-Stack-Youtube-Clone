import React, { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useChannelSubscribe, useChannelUnsubscribe, useGetChannelProfile } from '../../ReactQueryAndMutations/ChannelQueries'
import { useSelector } from 'react-redux'

const ChannelViewLayout = () => {

    const { pathname } = useLocation()
    const { username } = useParams()

    const channelPath = [
        {
            title: "Videos",
            to: "videos"
        },
        {
            title: "Playlist",
            to: "",
        },
        {
            title: "Tweets",
            to: ""
        },
        {
            title: "Subscribers",
            to: ""
        }
    ]

    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const user = useSelector(state => state.user?.user)
    


    const { data: channel, isLoading: gettingChannelData, isError, error } = useGetChannelProfile({ username });
    const { mutateAsync: subscribeChannel, isLoading: subscribingChannel } = useChannelSubscribe()
    const { mutateAsync: unsubscribeChannel, isLoading: unsubscribingChannel } = useChannelUnsubscribe()

    const handleSubscriptionOfChannel = async () => {
        try {
            if(!isAuthenticated){
                toast.warn("Login To Perform")
            }
            if (channel?.isSubscribedTo) {
                const response = await unsubscribeChannel({ username })
            } else {
                const response = await subscribeChannel({ username })

            }
        } catch (error) {
            
        }
    }


    if (isError) {
        return (
            <h1 className='text-6xl text-white'>{error?.message}</h1>
        )
    }

    return gettingChannelData ? <>
        <h1 className='text-6xl text-white'>Loading..</h1>
    </>
        :
        (
            <>

                <div className="relative min-h-[150px] w-full pt-[16.28%]">
                    <div className="absolute inset-0 overflow-hidden">
                        <img
                            src="https://images.pexels.com/photos/1092424/pexels-photo-1092424.jpeg?auto=compress"
                            alt="cover-photo" />
                    </div>

                </div>
                <div class="px-4 pb-4">
                    <div class="flex flex-wrap gap-4 pb-4 pt-6">
                        <span class="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2">
                            <img
                                src={channel?.avatar.url}
                                alt="Channel"
                                class="h-full w-full object-cover object-center" />
                        </span>
                        <div class="mr-auto inline-block">
                            <h1 class="font-bolg text-xl">{channel?.fullname}</h1>
                            <p class="text-sm text-gray-400">{channel?.username}</p>
                            <p class="text-sm text-gray-400">{channel?.subscribersCount} Subscribers · {channel?.channelSubscribeToCount}  Subscribed</p>
                        </div>
                        <div class="inline-block">
                            <div class="inline-flex min-w-[145px] justify-end">
                                {
                                    channel?.username === user.username ?
                                        <>
                                            <Link to={`/${user.username}/edit-personal`}>
                                                <button
                                                    className="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto">
                                                    Edit Channel
                                                </button>
                                            </Link>
                                        </>

                                        :
                                        <button
                                            onClick={() => handleSubscriptionOfChannel()}
                                            disabled={subscribingChannel || unsubscribingChannel}
                                            style={{
                                                cursor: subscribingChannel ? "not-allowed" : "pointer", // Disable pointer if loading
                                                opacity: channel?.isSubscribedTo ? 1 : 0.5, // Visually indicate disabled state
                                            }}
                                            class="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto">
                                            <span class="inline-block w-5">
                                                <img src={subscribingChannel || unsubscribingChannel ? "../public/Logo/loading.svg" : "../public/Logo/subscribe.svg"} alt="" />
                                            </span>
                                            <span>{channel?.isSubscribedTo ? "Subscribed" : "Subscribe"}</span>
                                        </button>
                                }
                            </div>
                        </div>
                    </div>
                    <ul className="no-scrollbar sticky top-[66px] z-[2] flex flex-row gap-x-2 overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[82px]">

                        {
                            channelPath.map((cur) => {
                                const isActive = pathname === `/${username}/${cur.to}`

                                return (
                                    <NavLink key={cur.title} to={`/${username}/${cur.to}`}>
                                        <li className="w-full"><button className={`w-full   px-3 py-1.5 ${isActive ? "text-[#ae7aff] bg-white border-[#ae7aff] " : "text-white"}`}>{cur.title}</button></li>
                                    </NavLink>
                                )

                            })
                        }
                    </ul>

                    <Outlet />

                </div>

            </>
        )
}

export default ChannelViewLayout