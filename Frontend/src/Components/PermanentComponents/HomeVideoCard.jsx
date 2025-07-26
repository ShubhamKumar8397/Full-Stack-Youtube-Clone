import React from 'react'
import { Link } from 'react-router-dom'
import { formatTime } from '../../Utils/formatTime'
import { timeAgo } from '../../Utils/changeTimeString'

const HomeVideoCard = ({ video }) => {
    return (
        <Link to={`/video/${video._id}`} key={video._id}>
            <div className="w-full">
                <div className="relative mb-2 w-full pt-[56%]">
                    <div className="absolute inset-0">
                        <img
                            src={video.thumbnail.url}
                            alt="Building a RESTful API with Node.js and Express"
                            className="h-full w-full" />
                    </div>
                    <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">{formatTime(video.duration)}</span>
                </div>
                <div className="flex gap-x-2">
                    <div className="h-10 w-10 shrink-0">
                        <img
                            src={video.owner.avatar.url}
                            alt="apibuilder"
                            className="h-full w-full rounded-full" />
                    </div>
                    <div className="w-full">
                        <h6 className="mb-1 font-semibold">{video.title}</h6>
                        <p className="flex text-sm text-gray-200">14.5k Views · {timeAgo(video.createdAt)} </p>
                        <p className="text-sm text-gray-200">{video.owner.fullname}</p>
                    </div>
                </div>
            </div>
        </Link >
    )
}

export default HomeVideoCard