import React from 'react'
import { timeAgo } from '../Utils/changeTimeString'
import { formatTime } from '../Utils/formatTime'
import { Link } from 'react-router-dom'

const ChannelVideo = ({video}) => {
    return (
        <Link to={`/video/${video._id}`} key={video._id}>
            <div  key={video._id} class="w-full">
            <div class="relative mb-2 w-full pt-[56%]">
                <div class="absolute inset-0">
                    <img
                        src={video.thumbnail.url}
                        alt="JavaScript Fundamentals: Variables and Data Types"
                        class="h-full w-full" />
                </div>
                <span class="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">{formatTime(video.duration)}</span>
            </div>
            <h6 class="mb-1 font-semibold">{video.title}</h6>
            <p class="flex text-sm text-gray-200">10.3k Views · {timeAgo(video.createdAt)}</p>
        </div>
        </Link>
    )
}

export default ChannelVideo