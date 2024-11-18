import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { uploadImageOnCloudinary, uploadVideoOnCloudinary } from "../utils/cloudinary.js"
import { Video } from "../Models/video.model.js"



    // const allowedMimeTypes = [
    //   "video/mp4",
    //   "video/x-matroska", // .mkv
    //   "video/quicktime",  // .mov
    //   "video/x-msvideo",  // .avi
    //   "video/mpeg",       // .mpeg
    // ];

const publishVideo = asyncHandler(async (req, res, next) => {
    const {title, description} = req.body

    if(!title && !description){
        return res.status(401).json(
            new ApiError (401, "All Fields Required")
        )
    } 

    if(!req.files){
        return res.status(401).json(
            new ApiError(401, "No File Received")
        )
    }
    

    const videoFilePath = req.files?.videoFile[0].path 
    console.log(videoFilePath)
    
    if(!videoFilePath){
        return res.status(401).json(
            new ApiError(401, "No video Received")
        )
    }

    const thumbanailFilePath = req.files?.thumbnail[0].path

    if(!thumbanailFilePath){
        return res.status(401).json(
            new ApiError(401, "No Thumbnail Received")
        )
    }

    try {

    const uploadVideoResponse = await uploadVideoOnCloudinary(videoFilePath)
    if(!uploadVideoResponse){
        return res.status(501).json(
            new ApiError(501, "Server Error!! During Uploading Video")
        )
    }

    const uploadThumbnailResponse = await uploadImageOnCloudinary(thumbanailFilePath)

    if(!uploadThumbnailResponse){
        return res.status(501).json(
            new ApiError(501, "Server Error !! During Uploading Thumbnail")
        )
    }


    const publishVideoDocument = await Video.create({
        videoFile : {
            id : uploadVideoResponse.public_id,
            url : uploadVideoResponse.secure_url,
           
        },
        thumbnail : {
            id : uploadThumbnailResponse.public_id,
            url : uploadThumbnailResponse.url,
            
        },
        owner : req.user._id,
        title,
        description,
        duration : uploadVideoResponse.duration,

    })

    if(!publishVideoDocument){
        return res.status(501).json(
            new ApiError(501, "Error during video Document Creating")
        )
    }

    return res.status(201).json(
        new ApiResponse(201, publishVideoDocument, "Video Uploaded Successfully")
    )
    



    // return res.status(200).json(
    //     new ApiResponse(200, {videoUpload : uploadVideoResponse, filesCome : req.files}, "Successfully Uploaded")
    // )


    } catch (error) {
        return res.status(error?.status || 401).json(
            new ApiError(error?.status || 401 , error?.message || "Uploading To Cloudinary Error")
        )
    }

})



export {
    publishVideo
}