import { User } from "../Models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadImageOnCloudinary } from "../utils/cloudinary.js"
import fs from "fs"


const registerUser = asyncHandler(async (req, res, next) => {
    const { username, email, fullname, password } = req.body

    const trimmedFields = [username, email, fullname, password].map(field => field.trim());

    if (trimmedFields.some(cur => cur === "")) {
        throw new ApiError(
            400, "All fields are required"
        );
    }

    const user = await User.findOne(
        {
            $or: [{ username }, { email }]
        }
    )
    // console.log(user)

    if (user) {
       if(user){
        fs.unlinkSync(req.files?.avatar[0].path)
        fs.unlinkSync(req.files?.coverImage[0].path)
       }
        throw new ApiError(400, "With this Email or Username User Already Exists")
    }

    const avatarFilePath = req.files?.avatar[0].path


    let coverImageFilePath;
    let coverImageUrl;
    if (req.files.coverImage &&
        req.files.coverImage.length &&
        Array.isArray(req.files.coverImage)) {
        coverImageFilePath = req.files.coverImage[0].path
    }

    if (!avatarFilePath) {
        throw new ApiError.json(401, "Avatar Image Not Found")
    }


    const avatarUrl = await uploadImageOnCloudinary(avatarFilePath)
    if(coverImageFilePath){
         coverImageUrl = await uploadImageOnCloudinary(coverImageFilePath)
    }
    const createdUser = await User.create(
        {
            username,
            email,
            fullname,
            avatar : {
                url : avatarUrl.url,
                id : avatarUrl.public_id
            },
            coverImage : {
                url : coverImageUrl?.url || "",
                id: coverImageUrl?.public_id || ""
            },
            password
        }
    )

    return res.status(200).json(
        new ApiResponse(
            200, createdUser , "Your User Successfully Register"
        )
    )
})



export {
    registerUser
}