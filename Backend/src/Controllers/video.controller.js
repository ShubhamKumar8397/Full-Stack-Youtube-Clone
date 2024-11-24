import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { deleteImagesFromCloudinary, deleteVideoFromCloudinary, uploadImageOnCloudinary, uploadVideoOnCloudinary } from "../utils/cloudinary.js"
import { Video } from "../Models/video.model.js"
import mongoose from "mongoose"
import { User } from "../Models/user.model.js"



const allowedMimeTypes = [
    "video/mp4",
    "video/x-matroska", // .mkv
    "video/quicktime",  // .mov
    "video/x-msvideo",  // .avi
    "video/mpeg",       // .mpeg
];


const getAllChannelVideos = asyncHandler(async (req, res, next) => {

    const {username} = req.params
    const {page} = req.query
    
    if (!username) {
        return res.status(401).json(
            new ApiError(401, "channel Video Not Received For Get videos")
        )
    }

    const options = {
        page: page || 1,
        limit: 5,
        sort : {createdAt : -1},
        customLabels : {
            docs : "videos"
        }
    };

    const userChannel = await User.findOne({username})
    if(!userChannel){
        return res.status(401).json(
            new ApiError(401, "Channel Doesn't Exits ")
        )
    }

    const pipeline = [
        {
            $match: {
                owner: userChannel._id
            },
        },
        {
            $project: {
                _id: 1,
                title: 1,
                thumbnail : 1,
                duration : 1,
                createdAt : 1
            }
        }

    ]


    // console.log(videos)

    Video.aggregatePaginate(pipeline, options, function(err, results){
        if(err) {
            return res.status(err?.status || 501).json(
                new ApiError(err.status || 501 , err.message || "During aggregate pagination")
            )
        } else {
            if(!results.videos && !results.videos.length){
                return res.status(200).json(
                    new ApiResponse(200, {}, "No Videos Uploaded By This Channel")
                )
            }else{
                return res.status(200).json(
                    new ApiResponse(200, results, "Fetched Successfully")
                )
            }
            
        }
    })

})

const publishVideo = asyncHandler(async (req, res, next) => {
    const { title, description } = req.body

    if (!title && !description) {
        return res.status(401).json(
            new ApiError(401, "All Fields Required")
        )
    }

    if (!req.files) {
        return res.status(401).json(
            new ApiError(401, "No File Received")
        )
    }


    if (!allowedMimeTypes.includes(req.files.videoFile[0].mimetype)) {
        return res.status(401).json(
            new ApiError(401, "File Not Supported !!! Need Video File ")
        )
    }


    const videoFilePath = req.files?.videoFile[0].path

    if (!videoFilePath) {
        return res.status(401).json(
            new ApiError(401, "No video Received")
        )
    }

    const thumbanailFilePath = req.files?.thumbnail[0].path

    if (!thumbanailFilePath) {
        return res.status(401).json(
            new ApiError(401, "No Thumbnail Received")
        )
    }

    try {

        const uploadVideoResponse = await uploadVideoOnCloudinary(videoFilePath)
        if (!uploadVideoResponse) {
            return res.status(501).json(
                new ApiError(501, "Server Error!! During Uploading Video")
            )
        }

        const uploadThumbnailResponse = await uploadImageOnCloudinary(thumbanailFilePath)

        if (!uploadThumbnailResponse) {
            return res.status(501).json(
                new ApiError(501, "Server Error !! During Uploading Thumbnail")
            )
        }


        const publishVideoDocument = await Video.create({
            videoFile: {
                id: uploadVideoResponse.public_id,
                url: uploadVideoResponse.secure_url,

            },
            thumbnail: {
                id: uploadThumbnailResponse.public_id,
                url: uploadThumbnailResponse.url,

            },
            owner: req.user._id,
            title,
            description,
            duration: uploadVideoResponse.duration,

        })

        if (!publishVideoDocument) {
            return res.status(501).json(
                new ApiError(501, "Error during video Document Creating")
            )
        }

        return res.status(201).json(
            new ApiResponse(201, publishVideoDocument, "Video Uploaded Successfully")
        )


    } catch (error) {
        return res.status(error?.status || 401).json(
            new ApiError(error?.status || 401, error?.message || "Uploading To Cloudinary Error")
        )
    }

})

const getVideoById = asyncHandler(async (req, res, next) => {
    const { videoId } = req.params

    const objectId = new mongoose.Types.ObjectId(videoId)
    console.log(objectId)

    if (!videoId) {
        return res.status(401).json(
            new ApiError(401, "Not VideoId Received")
        )
    }

    const video = await Video.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(videoId)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
            }
        },
        {
            $unwind: "$owner"
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "owner._id",
                foreignField: "channel",
                as: "subscribers"
            }
        },
        {
            $addFields: {
                subscribersCount: { $size: "$subscribers" },
                isSubscribedTo: {
                    $cond: {
                        if: { $in: [req.user?._id, "$subscribers.subscriber"] },
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "video",
                as: "videoLikes"
            }
        },
        {
            $addFields: {
                likesCount: { $size: "$videoLikes" },
                isLikedTo: {
                    $cond: {
                        if: { $in: [req.user?._id, "$videoLikes.likedBy"] },
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $project: {
                title : 1,
                description : 1,
                videoFile: 1,
                createdAt : 1,
                fullname: 1,
                username: 1,
                owner: {
                    fullname: 1,
                    username: 1,
                    avatar : 1
                },
                subscribersCount: 1,
                isSubscribedTo: 1,
                likesCount: 1,
                isLikedTo: 1
            }
        }
    ])

    console.log(video)

    if (!video && !video.length) {
        return res.status(401).json(
            new ApiError(401, "No Video Found")
        )
    }

    return res.status(201).json(
        new ApiResponse(201, video[0], "video Fetched Successfully")
    )
})

const updateVideo = asyncHandler(async (req, res, next) => {
    const { videoId, title, description } = req.body

    if (!videoId) {
        return res.status(401).json(
            new ApiError(401, "Not VideoId Received")
        )
    }

    try {
        const video = await Video.findById(videoId)

        if (!video) {
            return res.status(401).json(
                new ApiError(401, "No Video Find with this Id")
            )
        }

        if (req.user?._id.toString() !== video.owner.toString()) {
            return res.status(403).json(
                new ApiError(403, "You Are not authorized Not owner of This Video")
            )
        }

        let thumbnailUploadResponse;
        if (req.file && req.file.path) {
            thumbnailUploadResponse = await uploadImageOnCloudinary(req.file.path)
        }

        video.title = title
        video.description = description

        if (thumbnailUploadResponse) {
            video.thumbnail.id = thumbnailUploadResponse.public_id || video.id
            video.thumbnail.url = thumbnailUploadResponse.url || video.url
        }

        const updatedVideo = await video.save()


        if (!updatedVideo) {
            return res.status(401).json(
                new ApiError(401, "Server Error !! During Update")
            )
        }

        if (thumbnailUploadResponse && req.file) {
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

const tooglePublishVideo = asyncHandler(async (req, res, next) => {
    const { videoId } = req.body
    if (!videoId) {
        return res.status(401).json(
            new ApiError(400, "Video Id Not Received")
        )
    }

    const video = await Video.findById(videoId)

    if (req.user._id.toString() !== video.owner.toString()) {
        return res.status(403).json(
            new ApiError(403, "You Are not authorized Not owner of This Video")
        )
    }

    video.isPublished = !video.isPublished
    const updatedToggle = await video.save()

    if (!updatedToggle) {
        return res.status(401).json(
            new ApiError(401, "Toogle Operation Unsuccessful")
        )
    }

    return res.status(200).json(
        new ApiResponse(200, { isPublished: updatedToggle.isPublished }, "toggle for isPublished Successful")
    )
})

const deleteVideo = asyncHandler(async (req, res, next) => {
    const { videoId } = req.body
    if (!videoId) {
        return res.status(401).json(
            new ApiError(400, "Video Id Not Received")
        )
    }

    const video = await Video.findById(videoId)
    if (!video) {
        return res.status(401).json(
            new ApiError(401, "No Video With This Id Found")
        )
    }

    if (video.owner.toString() !== req.user._id.toString()) {
        return res.status(401).json(
            new ApiError(401, "Your Are Not Authorized - not Owner of This Video")
        )
    }

    try {

        const deleteVideoResult = await Video.deleteOne({ _id: videoId })
        if (!deleteVideoResult) {
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
    getAllChannelVideos,
    publishVideo,
    updateVideo,
    getVideoById,
    tooglePublishVideo,
    deleteVideo,

}