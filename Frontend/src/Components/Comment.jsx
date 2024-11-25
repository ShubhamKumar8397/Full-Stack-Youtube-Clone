import React from 'react'
import { timeAgo } from '../Utils/changeTimeString'

const Comment = ({commentDetails}) => {
    return (
        <>
            <div class="flex gap-x-4">
                <div class="mt-2 h-11 w-11 shrink-0">
                    <img
                        src={commentDetails?.owner.avatar.url}
                        alt="sarahjv"
                        class="h-full w-full rounded-full" />
                </div>
                <div class="block">
                    <p class="flex items-center text-gray-200">
                        {commentDetails?.owner.fullname} ·  
                        <span class="text-sm"> {timeAgo(commentDetails?.createdAt)}</span>
                    </p>
                    <p class="text-sm text-gray-200">{commentDetails?.owner.username}</p>
                    <p class="mt-3 text-sm">{commentDetails?.content}</p>
                </div>
            </div>
            <hr class="my-4 border-white" />
        </>
    )
}

export default Comment