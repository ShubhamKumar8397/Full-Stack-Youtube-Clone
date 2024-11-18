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
       if(!filePath) throw new ApiError(401, "File Path Not Received")
        const uploadResult = await cloudinary.uploader.upload(filePath)
        fs.unlinkSync(filePath)
        return uploadResult;
    } catch (error) {
        fs.unlinkSync(filePath)
        throw new ApiError(
            error?.status || 501 , error?.message || "Error During Upload", 
        )
        
    }
}

const uploadVideoOnCloudinary = async (filePath) => {
    try {
        if(!filePath) throw new ApiError(401, "filepath not received To cloudinary")
        const uploadVideo = await cloudinary.uploader.upload(filePath, {
            resource_type : "video"
        })
        fs.unlinkSync(filePath)
        return uploadVideo

    } catch (error) {
        fs.unlinkSync(filePath)
        throw new ApiError(
            error?.status || 501 , error?.message || "Error During Upload Vido"
        )
       
    }
}

const deleteImagesFromCloudinary = async ([ids]) => {
    try {
        if(![ids] && ![ids].length){
            throw new ApiError(
                401, "Ids Not send For deletion"
            )
        }
        const deleteResult = await cloudinary.api.delete_resources([ids])
        return deleteResult
    } catch (error) {
        throw new ApiError(
            error?.status || 501 , error?.message || "Error During Delete Images"
        )
    }
}

const deleteVideoFromCloudinary = async(videoId) => {
    try {
        const deleteResult = await cloudinary.uploader.destroy(videoId , {resource_type: 'video', invalidate: true, type: 'authenticated'})
        return deleteResult
    } catch (error) {
        throw new ApiError(
            error?.status || 501 , error?.message || "Error During Delete Video"
        )
    }
}




export { uploadImageOnCloudinary, 
         uploadVideoOnCloudinary, 
         deleteImagesFromCloudinary, 
         deleteVideoFromCloudinary }