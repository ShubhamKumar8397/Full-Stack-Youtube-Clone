import mongoose, { Schema } from "mongoose";
import { Comment } from "../Models/comment.model.js";
import { Video } from "../Models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";



const createCommentOnVideo = asyncHandler(async (req, res, next) => {
    const {videoId} = req.params
    const {content} = req.body

    const VideoAvailable = await Video.findById(videoId)
    if(!VideoAvailable){
        return res.status(401).json(
            401, "Video Not Available For Comment"
        )
    }

    if(!videoId && !content) {
        return res.status(401).json(
            new ApiError(401, "Video Id and Content Both Required")
        )
    }

    try {  
        const createComment = await Comment.create({
            owner : req.user._id,
            video : videoId,
            content
        })

        if(!createComment){
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

const getAllVideoComments = asyncHandler(async(req, res, next) => {
    const {videoId} = req.params
    if(!videoId){
        return res.status(404).json(
            new ApiError(404, "video id not received")
        )
    }

    const commnets = await Comment.aggregate([
        {
            $match : {
                video : new mongoose.Types.ObjectId(videoId)
            }
        },
        {
            $lookup : {
                from : "users",
                localField : "owner",
                foreignField : "_id",
                as : "owner",
                pipeline : [
                    {
                        $project : {
                            username : 1,
                            createdAt : 1,
                            avatar : 1
                        }
                    },
                    
                ]
            }
        },
        {
            
                $addFields : {
                   owner : {
                     $first : "$owner"
                   }
                }
            
        }
    ])


    return res.status(200).json(
        new ApiResponse(200, commnets, "Comments Fetched Successfully")
    )
})

const updateVideoComments = asyncHandler(async(req, res, next) => {
    const {commentId} = req.body
    if(!commentId){
        return res.status(401).json(
            new ApiError(401, "Comment Id Not Given")
        )
    }
})

export {
    createCommentOnVideo,
    getAllVideoComments,
}