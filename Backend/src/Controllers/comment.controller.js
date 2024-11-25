import mongoose, { Schema } from "mongoose";
import { Comment } from "../Models/comment.model.js";
import { Video } from "../Models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";



const createCommentOnVideo = asyncHandler(async (req, res, next) => {
    const { videoId } = req.params
    const { content } = req.body

    const VideoAvailable = await Video.findById(videoId)
    if (!VideoAvailable) {
        return res.status(401).json(
            401, "Video Not Available For Comment"
        )
    }

    if (!videoId && !content) {
        return res.status(401).json(
            new ApiError(401, "Video Id and Content Both Required")
        )
    }

    try {
        const createComment = await Comment.create({
            owner: req.user._id,
            video: videoId,
            content
        })

        if (!createComment) {
            return res.status(501).json(
                new ApiError(501, "Server Error During Creating Comment")
            )
        }

        return res.status(201).json(
            new ApiResponse(201, createComment, "Comment Successfully Done")
        )

    } catch (error) {
        return res.status(error.status || 401).json(
            new ApiError(error.status || 401, error.message || "ERR !! During Creating Comment")
        )
    }
})

const getAllVideoComments = asyncHandler(async (req, res, next) => {
    const { videoId } = req.params
    if (!videoId) {
        return res.status(404).json(
            new ApiError(404, "video id not received")
        )
    }

    const commnets = await Comment.aggregate([
        {
            $match: {
                video: new mongoose.Types.ObjectId(videoId)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
                pipeline: [
                    {
                        $project: {
                            fullname : 1,
                            username: 1,
                            avatar: 1
                        }
                    },

                ]
            }
        },
        {
            $lookup :{
                from: "likes",
                localField : "_id",
                foreignField : "comment",
                as : "commentLikes"
            }
        },
        {
            $addFields: {
                owner: {
                    $first: "$owner"
                },
                isLikedTo : {
                    $cond : {
                        if : {$in : [req.user?._id , "$commentLikes.owner"]},
                        then : true,
                        else : false,
                    }
                }
            }
        },
        {
            $sort : {
                createdAt : -1
            }
        }
    ])

    return res.status(200).json(
        new ApiResponse(200, commnets, "Comments Fetched Successfully")
    )
})

const updateComments = asyncHandler(async (req, res, next) => {
    const { commentId, content } = req.body

    if (!commentId) {
        return res.status(401).json(
            new ApiError(401, "Comment Id Not Given")
        )
    }

    const comment = await Comment.findById(commentId)
    if (!comment) {
        return res.status(404).json(
            new ApiError(404, "Comment With This Id Not Found")
        )
    }

    if (comment.owner.toString() != req.user._id) {
        return res.status(401).json(
            new ApiError(401, "Your Are Not Owner Of this Comment")
        )
    }

    const updatedComment = await Comment.updateOne(
        {
            _id: commentId
        },
        {
            $set: {
                content
            }
        },
        {
            new: true
        }
    )

    if (!updatedComment) {
        return res.status(501).json(
            new ApiError(501, "ERR !! Server Err During Comment Update")
        )
    }

    return res.status(200).json(
        new ApiResponse(200, updatedComment, "Comment Successfully Updated")
    )


})

const deleteComment = asyncHandler(async (req, res, next) => {
    const { commentId } = req.body

    if (!commentId) {
        return res.status(401).json(
            new ApiError(401, "Comment Not Received For Comment Delete")
        )
    }

    const comment = await Comment.findById(commentId)

    if (!comment) {
        return res.status(404).json(
            new ApiError(404, "Comment With The Given Id Not Found")
        )
    }

    if (comment.owner.toString() != req.user._id) {
        return res.status(401).json(
            new ApiError(401, "Unauthorized Req !! You are not owner of This Comment")
        )
    }


    const deleteComment = await Comment.deleteOne({ _id: commentId })

    if (!deleteComment) {
        return res.status(501).json(
            new ApiError(501, " SERVER ERR !! During Comment Deletion")
        )
    }
    return res.status(200).json(
        new ApiResponse(200, {}, "Delete Comment Successfully")
    )
})


export {
    createCommentOnVideo,
    getAllVideoComments,
    updateComments,
    deleteComment,
}