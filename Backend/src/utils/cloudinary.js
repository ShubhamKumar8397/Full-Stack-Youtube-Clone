import { v2 as cloudinary } from 'cloudinary';
import { ApiError } from './ApiError.js';
import fs from "fs"


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME , 
    api_key:process.env.CLOUDINARY_API_KEY , 
    api_secret:  process.env.CLOUDINARY_API_SECRET 
});


const uploadImageOnCloudinary = async (filePath) => {
    try {
        if(!filePath) throw new ApiError(401, "filepath not received To cloudinary")
        const uploadResult = await cloudinary.uploader.upload(filePath)
        fs.unlinkSync(filePath)
        return uploadResult;
    } catch (error) {
        console.log(`Error During uploading Image ${error?.message}`)
        fs.unlinkSync(filePath)
    }
}

const uploadVideoOnCloudinary = async (filePath) => {
    try {
        if(!filePath) throw new ApiError(401, "filepath not received To cloudinary")
        const uploadVideo = await cloudinary.uploader.upload_large(filePath, {
            resource_type : "video"
        })
        fs.unlinkSync(filePath)
        return uploadVideo

    } catch (error) {
        console.log(`Error During Uploading Video ${error}`)
        fs.unlinkSync(filePath)
    }
}

const deleteImagesFromCloudinary = async ([ids]) => {
    try {
        const deleteResult = await cloudinary.api.delete_resources([ids])
        return deleteResult
    } catch (error) {
        console.log(`Error During delete Images ${error}`)
    }
}

const deleteVideoFromCloudinary = async(videoId) => {
    try {
        const deleteResult = await cloudinary.uploader.destroy(videoId , {resource_type: 'video', invalidate: true, type: 'authenticated'})
        return deleteResult
    } catch (error) {
        console.log(`Error During Delete the Video ${error}`)
    }
}




export { uploadImageOnCloudinary, 
         uploadVideoOnCloudinary, 
         deleteImagesFromCloudinary, 
         deleteVideoFromCloudinary }