import React, { useEffect, useState } from 'react'
import { SideVideo, Comment } from '../Components'
import { useGetVideoById } from '../ReactQueryAndMutations/videoQueries'
import { Link, useParams } from 'react-router-dom'
import { timeAgo } from '../Utils/changeTimeString'
import { useChannelSubscribe, useChannelUnsubscribe } from '../ReactQueryAndMutations/ChannelQueries'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useToggleVideoLike } from '../ReactQueryAndMutations/likeQueries'
import { useCreateCommentOnVideo } from '../ReactQueryAndMutations/CommentQueries'





const VideoPlayingPage = () => {

    const { videoId } = useParams()
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const user = useSelector(state => state.user.user)
    


    const { data: videoData, isLoading: IsplayingVideo } = useGetVideoById({ videoId })

    // handle Like Functions

    const { mutateAsync: toggleLikeEvent, isLoading: isLikingVideo, isError } = useToggleVideoLike()

    const handleLikeOfChannel = async () => {
        try {
            if (!isAuthenticated) {
                toast.info("Login To perform")
                return false;
            } else {
                const response = await toggleLikeEvent({ videoId: videoData?._id })
            }
        } catch (error) {
            toast.error(error.message || "Error During Like Event")
        }
    }

    // handleSubscription Functions

    const { mutateAsync: subscribeChannel, isLoading: subscribingChannel } = useChannelSubscribe()
    const { mutateAsync: unsubscribeChannel, isLoading: unsubscribingChannel } = useChannelUnsubscribe()

    const handleSubscriptionOfChannel = async () => {
        try {
            if (!isAuthenticated) {
                toast.warn("Login To Perform")
                return false;
            }
            if (videoData?.isSubscribedTo) {
                const response = await unsubscribeChannel({ username: videoData.owner.username })
            } else {
                const response = await subscribeChannel({ username: videoData.owner.username })

            }
        } catch (error) {
            toast.error(error?.message || "Error during Subscription")
        }
    }


    // handle Doing Comment

    const [commentInput, setCommentInput] = useState("")
    const {mutateAsync:commentOnVideo, isLoading:isCommentPostingLoading} = useCreateCommentOnVideo()

    const handleCommentPosting = async() => {
        try {
            const formData = {
                videoId,
                content :commentInput
            }
            const response = await commentOnVideo(formData)
        } catch (error) {
            
        }
    }





    return IsplayingVideo ? <h1 className='text-8xl flex justify-center items-center'>Loading</h1>
        :
        (
            <section>
                <div className="flex  w-full flex-wrap  gap-4 p-4 lg:flex-nowrap">
                    <div className="col-span-12 w-full">
                        {/* video part */}
                        <div className="relative mb-4 w-full pt-[56%]">
                            <div className="absolute inset-0">
                                <video
                                    className="h-full w-full"
                                    controls
                                    autoPlay=""
                                    muted="">
                                    <source
                                        src={videoData.videoFile.url}
                                        type="video/mp4" />
                                </video>
                            </div>
                        </div>
                        <div
                            className="group mb-4 w-full rounded-lg border p-4 duration-200 hover:bg-white/5 focus:bg-white/5"
                            role="button"
                            tabindex="0">
                            <div className="flex flex-wrap gap-y-2">
                                <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
                                    <h1 className="text-lg font-bold">{videoData.title}</h1>
                                    <p className="flex text-sm text-gray-200">30,164 Views ·  {timeAgo(videoData.createdAt)}</p>
                                </div>
                                <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
                                    <div className="flex items-center justify-between gap-x-4 md:justify-end lg:justify-between xl:justify-end">
                                        <div className="flex overflow-hidden rounded-lg border">

                                            {/* for likes button */}

                                            <button
                                                onClick={() => handleLikeOfChannel()}
                                                disabled={isLikingVideo}
                                                className=" flex items-center gap-x-2 border-r border-gray-700 px-4 py-1.5 hover:bg-white/10 ">
                                                <span className="inline-block w-5">
                                                    <img src={isLikingVideo ? "../Public/Logo/loading.svg" : videoData.isLikedTo ? "../Public/Logo/like.svg" : "../Public/Logo/liked.svg"} alt="" />
                                                </span>
                                                {videoData.likesCount}
                                            </button>
                                            <button
                                                className=" flex items-center gap-x-2 px-4 py-1.5 after:content-[attr(data-like)] hover:bg-white/10 "
                                            >
                                                <span className="inline-block w-5 ">
                                                    <img src="../Public/Logo/dislike.svg" alt="" />
                                                </span>
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <Link to={`/${videoData.owner.username}/videos`}>
                                    <div className="flex items-center gap-x-4">
                                        <div className="mt-2 h-12 w-12 shrink-0">
                                            <img
                                                src={videoData.owner.avatar.url}
                                                alt="reactpatterns"
                                                className="h-full w-full rounded-full" />
                                        </div>
                                        <div className="block">
                                            <p className="text-gray-200">{videoData.owner.fullname}</p>
                                            <p className="text-sm text-gray-400">{videoData.subscribersCount}</p>
                                        </div>
                                    </div>
                                </Link>
                                <div className="block">
                                    {/* for subscription  */}

                                    {
                                        user.username === videoData.owner.username ?
                                            <Link to={`/${videoData?.owner.username}/videos`}>
                                                <button
                                                    className="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto">
                                                    View channel
                                                </button>
                                            </Link>
                                            :
                                            <button
                                                onClick={() => handleSubscriptionOfChannel()}
                                                disabled={subscribingChannel || unsubscribingChannel}
                                                style={{
                                                    cursor: subscribingChannel ? "not-allowed" : "pointer", // Disable pointer if loading
                                                    opacity: videoData?.isSubscribedTo ? 1 : 0.5, // Visually indicate disabled state
                                                }}
                                                class="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto">
                                                <span class="inline-block w-5">
                                                    <img src={subscribingChannel || unsubscribingChannel ? "../public/Logo/loading.svg" : "../public/Logo/subscribe.svg"} alt="" />
                                                </span>
                                                <span>{videoData?.isSubscribedTo ? "Subscribed" : "Subscribe"}</span>
                                            </button>
                                    }
                                </div>
                            </div>
                            <hr className="my-4 border-white" />
                            <div className="h-5 overflow-hidden group-focus:h-auto">
                                <p className="text-sm">
                                    {videoData?.description}
                                </p>
                            </div>
                        </div>

                        {/* comments Portion Start */}

                        <button className="peer w-full rounded-lg border p-4 text-left duration-200 hover:bg-white/5 focus:bg-white/5 sm:hidden"><h6 className="font-semibold">573 Comments...</h6></button>
                        <div
                            className="fixed inset-x-0 top-full z-[60] h-[calc(100%-69px)] overflow-auto rounded-lg border bg-[#121212] p-4 duration-200 hover:top-[67px] peer-focus:top-[67px] sm:static sm:h-auto sm:max-h-[500px] lg:max-h-none">
                            <div className="block">
                                <h6 className="mb-4 font-semibold">573 Comments</h6>
                                <div className='relative'>
                                    <input
                                        onChange={(e) => setCommentInput(e.target.value)}
                                        type="text"
                                        className="w-full rounded-lg border bg-transparent px-2 py-1 placeholder-white"
                                        placeholder="Add a Comment" />

                                    <img
                                        onClick={() => handleCommentPosting()}
                                        className='absolute right-3 bottom-[6px] cursor-pointer'
                                        src="../Public/Logo/send.svg"
                                        alt=""
                                    />
                                </div>

                            </div>
                            <hr className="my-4 border-white" />
                            <Comment />
                        </div>
                    </div>
                    <div className="col-span-12 flex w-full shrink-0 flex-col gap-3 lg:w-[350px] xl:w-[400px]">
                        <SideVideo />
                    </div>
                </div>
            </section >

        )
}

export default VideoPlayingPage