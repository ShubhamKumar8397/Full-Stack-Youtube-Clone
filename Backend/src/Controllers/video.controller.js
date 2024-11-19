import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { deleteImagesFromCloudinary, deleteVideoFromCloudinary, uploadImageOnCloudinary, uploadVideoOnCloudinary } from "../utils/cloudinary.js"
import { Video } from "../Models/video.model.js"



    const allowedMimeTypes = [
      "video/mp4",
      "video/x-matroska", // .mkv
      "video/quicktime",  // .mov
      "video/x-msvideo",  // .avi
      "video/mpeg",       // .mpeg
    ];

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


    if(!allowedMimeTypes.includes(req.files.videoFile[0].mimetype)){
        return res.status(401).json(
            new ApiError(401, "File Not Supported !!! Need Video File ")
        )
    }
    

    const videoFilePath = req.files?.videoFile[0].path 

    
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
    

    } catch (error) {
        return res.status(error?.status || 401).json(
            new ApiError(error?.status || 401 , error?.message || "Uploading To Cloudinary Error")
        )
    }

})

const getVideoById = asyncHandler(async (req, res, next) => {
    const {videoId} = req.params

    if(!videoId){
        return res.status(401).json(
            new ApiError(401, "Not VideoId Received")
        )
    }

})

const updateVideo = asyncHandler(async(req, res, next) => {
    const {videoId, title, description} = req.body

    if(!videoId){
        return res.status(401).json(
            new ApiError(401, "Not VideoId Received")
        )
    }

    try {
        const video = await Video.findById(videoId)

        if(!video){
            return res.status(401).json(
                new ApiError(401, "No Video Find with this Id")
            )
        }

        if(req.user?._id.toString() !== video.owner.toString() ){
            return res.status(403).json(
                new ApiError(403, "You Are not authorized Not owner of This Video")
            )
        }

        let thumbnailUploadResponse;
        if(req.file && req.file.path){
            thumbnailUploadResponse = await uploadImageOnCloudinary(req.file.path)
        }

        video.title = title
        video.description = description

        if(thumbnailUploadResponse){
            video.thumbnail.id = thumbnailUploadResponse.public_id || video.id
            video.thumbnail.url = thumbnailUploadResponse.url || video.url
        }

        const updatedVideo = await video.save()

    
        if(!updatedVideo){
            return res.status(401).json(
                new ApiError(401, "Server Error !! During Update")
            )
        }

        if(thumbnailUploadResponse && req.file){
            const deleteOldThumbnail = await deleteImagesFromCloudinary([video.thumbnail.public_id])
        }

        return res.status(200).json(
            new ApiResponse(200, updatedVideo, "Video Updated Successfully")
        )
    } catch (error) {
        return res.status(error?.status || 401).json(
            new ApiError(error?.status || 401, error?.message || "Video Not updated")
        )
    }


})

const tooglePublishVideo = asyncHandler(async(req, res, next) => {
    const {videoId} = req.body
    if(!videoId){
        return res.status(401).json(
            new ApiError(400, "Video Id Not Received")
        )
    }

    const video = await Video.findById(videoId)

    if(req.user._id.toString() !== video.owner.toString()){
        return res.status(403).json(
            new ApiError(403, "You Are not authorized Not owner of This Video")
        )
    }

    video.isPublished = !video.isPublished
    const updatedToggle = await video.save()

    if(!updatedToggle){
       return res.status(401).json(
            new ApiError(401, "Toogle Operation Unsuccessful")
       )
    }

    return res.status(200).json(
        new ApiResponse(200, {isPublished : updatedToggle.isPublished}, "toggle for isPublished Successful")
    )
})

const deleteVideo = asyncHandler(async(req, res, next) => {
    const {videoId} = req.body
    if(!videoId){
        return res.status(401).json(
            new ApiError(400, "Video Id Not Received")
        )
    }

    const video = await Video.findById(videoId)
    if(!video){
        return res.status(401).json(
            new ApiError(401, "No Video With This Id Found")
        )
    }

    if(video.owner.toString() !== req.user._id.toString()){
        return res.status(401).json(
            new ApiError(401, "Your Are Not Authorized - not Owner of This Video")
        )
    }

    try {
        
    const deleteVideoResult = await Video.deleteOne({_id : videoId})
    if(!deleteVideoResult){
        return res.status(501).json(
            new ApiError(501, "Server Error !During Delete")
        )
    }

    const deleteVideo = await deleteVideoFromCloudinary(video.videoFile.id)
    console.log(deleteVideo)

    const deleteThumbnail = await deleteImagesFromCloudinary([video.thumbnail.id])
    console.log(deleteThumbnail)

    return res.status(200).json(
        new ApiResponse(200, {}, "Video Delete Successfully")
    )


    } catch (error) {
        return res.status(error?.status || 501).json(
            new ApiError(error.status || 501, error?.message || "Server ERRR!! During Delte")
        )
    }

})



export {
    publishVideo,
    updateVideo,
    tooglePublishVideo,
    deleteVideo,
}