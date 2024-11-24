import { Like } from "../Models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const toggleVideoLike = asyncHandler(async(req, res, next) => {

    const {videoId} =  req.params

    if(!videoId){
        return res.status(404).json(
            new ApiError(404, "VideoId Not Received")
        )
    }

    const findExistingLike = await Like.findOne({
        video : videoId,
        likedBy : req.user?._id
    })


    if(findExistingLike){
        const unLikeVideo = await Like.deleteOne({_id : findExistingLike._id})
        if(!unLikeVideo){
            return res.status(501).json(
                new ApiError(501, "Server ERR !!unlike not successful")
            )
        }

        return res.status(201).json(
            new ApiResponse(201, {}, "Unlike video Successfully")
        )

    }else{
        const likeVideo = await Like.create({
            video : videoId,
            likedBy : req.user._id
        })

        if(!likeVideo){
            return res.status(501).json(
                new ApiError(501, "Server ERR !! Like Not successfully")
            )
        }

        return res.status(201).json(
            new ApiResponse(201, {}, "like video Successfully")
        )

        
    }
    

})


export {
    toggleVideoLike
}