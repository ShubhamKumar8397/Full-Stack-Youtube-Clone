import { User } from "../Models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { deleteImagesFromCloudinary, uploadImageOnCloudinary } from "../utils/cloudinary.js"
import jwt from "jsonWebToken"
import fs from "fs"




const generateRefreshAndAccessToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        if (!user) {
            throw new ApiError(504, "User id is not defined")
        }

        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()

        if (!accessToken || !refreshToken) {
            throw new ApiError(501, "Error During generate access and refresh Token")
        }

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave : false})

        return {refreshToken, accessToken}
    } catch (error) {   
       throw new ApiError(error?.status || 501, error?.message || "Error During Generatitng Tokens")
    }

}

const registerUser = asyncHandler(async (req, res, next) => {
    const { username, email, fullname, password } = req.body

    const trimmedFields = [username, email, fullname, password].map(field => field.trim());

    if (trimmedFields.some(cur => cur === "")) {
        return res.status(401).json(
            new ApiError(401, "All Fields Are Required")
        )
    }

    const user = await User.findOne(
        {
            $or: [{ username }, { email }]
        }
    )

    if (user) {
        if (user) {
            fs.unlinkSync(req.files?.avatar[0].path)
            if(req.files.coverImage &&
                req.files.coverImage.length &&
                Array.isArray(req.files.coverImage)){
                    fs.unlinkSync(req.files?.coverImage[0].path)
                }
        }

        return res.status(401).json(
            new ApiError(401, "User Already Exits With This Username or Email")
        )
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
        return res.status(404).json(
            new ApiError(404, "Avatar Image Not Found")
        )
    }


    const avatarUrl = await uploadImageOnCloudinary(avatarFilePath)
    if (coverImageFilePath) {
        coverImageUrl = await uploadImageOnCloudinary(coverImageFilePath)
    }
    const createdUser = await User.create(
        {
            username,
            email,
            fullname,
            avatar: {
                url: avatarUrl.url,
                id: avatarUrl.public_id
            },
            coverImage: {
                url: coverImageUrl?.url || "",
                id: coverImageUrl?.public_id || ""
            },
            password
        }
    )

    return res.status(200).json(
        new ApiResponse(
            200, createdUser, "Your User Successfully Register"
        )
    )
})

const loginUser = asyncHandler(async (req, res, next) => {

    // check required field is not empty
    // check user with this email or username exits or not
    // if exits then make a method to check the encrypted password is equal to the given passowrd
    // if password is correct then make a method to generate refresh and access token and store it in cookies and data base
    // then done :::::::


    const { username, email, password } = req.body
    if (!(username || email)) {
        return res.status(401).json(
            new ApiError(401, "All Fields Required")
        )
    }

    if (!password) {
        return res.status(401).json(
            new ApiError(401, "Password is Required")
        )
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        return res.status(401).json(
            new ApiError(401, "With This Email or Username No User Found")
        )
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password)

    if (!isPasswordCorrect) {
        return res.status(401).json(
            new ApiError(401, "Password is Incorrect")
        )
    }

    const { refreshToken, accessToken } = await generateRefreshAndAccessToken(user._id)

    const loggedInUser = await User.findById(user._id).select( -password -refreshToken)


    const options = {
        httpOnly: true,
        secure: true,
    }

    return res.status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
        new ApiResponse(200, loggedInUser, "Logged IN Successfully")
    )

})

const logoutUser = asyncHandler(async(req, res, next) => {


   const options = {
        httpOnly : true,
        secure : true
    }
    
    if(!req.user){
        throw new ApiError(404, "you are not logged In")
    }

    const userLogout  = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $unset : {
                refreshToken : 1
            }
        },
        {
            new : true
        }
    )
    if(!userLogout){
        throw new ApiError(404, "logged In User")
    }

    return res.status(201)
    .clearCookie("accessToken", options)
    .clearCookie('refreshToken', options)
    .json(
        new ApiResponse(201, {}, "User successfully Logout")
    )
})

const getCurrentUser = asyncHandler(async(req, res, next) => {
    if(!req.user){
        throw new ApiError(404, "Unauthorized req")
    }

    return res.status(200).json(
        new ApiResponse(200, req.user, "User Fetched Successfully")
    )
})

const refreshAccessToken = asyncHandler(async(req, res, next) => {
    const incomingRefreshToken = req.cookies?.refreshToken || req.header(Authorization).replace("Bearer", "")

    if(!incomingRefreshToken){
        throw new ApiError(401, "Refresh Token not found")
    }

   try {

     const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
 
     if(!decodedToken){
         throw new ApiError(401, "Token is Expired or unauthorized Please Login")
     }
 
     const user = await User.findById(decodedToken._id)
 
     if(!user){
         throw new ApiError(404, "Token Invalid Or Expired")
     }
 
     if(incomingRefreshToken !== user?.refreshToken){
         throw new ApiError(404, "Token Expire or Unauthorized req")
     }
 
     const {refreshToken, accessToken} = await generateRefreshAndAccessToken(user._id)
 
     const options = {
         secure : true,
         httpOnly : true
     }
 
     return res.status(200)
     .cookie("refreshToken" , refreshToken, options)
     .cookie("accessToken", accessToken, options )
     .json(
         new ApiResponse(200, {}, "Access and Refresh Token Refreshed successfully")
     )
   } catch (error) {
     throw new ApiError(404, error?.message || "invalid Token Request")
   }

})

const checkUsernameAvailable = asyncHandler(async(req, res, next) => {
    const {username} = req.body
    
    console.log(req.body)
    const user = await User.findOne({username})
    
    if(user){
        return res.status(200).json(
            new ApiResponse(200, {available : false} , "Username Not Available")
        )
    }else {
        return res.status(200).json(
            new ApiResponse(200, {available : true}, "Username  Available")
        )
    }
})

const updatePersonalDetails = asyncHandler(async(req, res, next) => {
    const {fullname, email} = req.body

    if(!fullname && !email) {
        return res.status(404).json(
            new ApiError(404, "All Fields Required")
        )
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set : {
                fullname,
                email
            }
        },
        {
            new : true
        }
    ).select( "-password")

    return res.status(200).json(
        new ApiResponse(200, {fullname : user.fullname, email : user.email}, "Information Updated Successfully")
    )

})

const updateChannelInformation = asyncHandler(async(req, res) => {
    const {username, description} = req.body
    if(!username && !description){
        return res.status(404).json(
            new ApiError(401, "All Fields Required")
        )
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set : {
                username,
                userChannelDescription : description
            }
        },
        {
            new : true
        }
    )

    if(!user){
        return res.staus(501).json(
            new ApiError(501, "Server Error! Information Not Update")
        )
    }

    return res.status(200).json(
        new ApiResponse(200, {username: user.username, description : user.userChannelDescription}, "iInformation Updated Successfully")
    )
})

const ChangePassword = asyncHandler(async(req, res) => {
    const {currentPassword, newPassword, confirmPassword} = req.body

    if(!currentPassword && !newPassword && !confirmPassword){
        return res.status(401).json(
            new ApiError(401, "All Fields Required")
        )
    }

    if(newPassword != confirmPassword){
        return res.status(401).json(
            new ApiError(401, "Confirm Password is Different")
        )
    }

    const user = await User.findById(req.user._id)
    const isPasswordCorrect =  await user.isPasswordCorrect(currentPassword)

    if(!isPasswordCorrect){
        return res.status(401).json(
            new ApiError(401, "Password Entered Wrong")
        )
    }

    user.password = newPassword;
    const changePassword = await user.save()


    if(!ChangePassword){
        return res.status(501).json(
            new ApiError(501, "Server Error!!")
        )
    }

    return res.status(201).json(
        new ApiResponse(201, {}, "Password Change Successfully")
    )
})

const updateAvatar = asyncHandler(async(req, res) => {
    if(!req.file){
        return res.status(400).json(
            new ApiError(400, "Avatar Image Not Received")
        )
    }

try {
    
    const user = await User.findById(req.user._id)
    const oldImageId = user?.avatar.id
    if(!user){
        return res.status(400).json(
            new ApiError(400, "Invalid Req Please Login Again")
        )
    }

    const avatar = await uploadImageOnCloudinary(req.file.path)
    if(!avatar){
        return res.status(501).json(
            new ApiError(501, "Server Error!! during Uploading")
        )
    }

    user.avatar = {url : avatar.url , id : avatar.public_id}
    const updatedUser = await user.save({validateBeforeSave : false})

    if(!updatedUser){
        return res.status(501).json(
            new ApiError(501, "Server Error Not update")
        )
    }

    const deleteResult = await deleteImagesFromCloudinary([oldImageId])
    console.log(deleteResult)
    
    return res.status(200).json(
        new ApiResponse(200, {}, "Avatar Successfully Updated")
    )
    
} catch (error) {
    await deleteImagesFromCloudinary([avatar.public_id])
    fs.unlink(req.file?.path)
    return res.status(400).json(
        new ApiError(400, error?.message)
    )
}

})

const updatecoverImage = asyncHandler(async(req, res) => {
    if(!req.file){
        return res.status(400).json(
            new ApiError(400, "Avatar Image Not Received")
        )
    }

try {
    
    const user = await User.findById(req.user._id)
    const oldImageId = user?.coverImage?.id
    if(!user){
        return res.status(400).json(
            new ApiError(400, "Invalid Req Please Login Again")
        )
    }

    const coverImage = await uploadImageOnCloudinary(req.file.path)
    if(!coverImage){
        return res.status(501).json(
            new ApiError(501, "Server Error!! during Uploading")
        )
    }

    user.coverImage = {url : coverImage.url , id : coverImage.public_id}
    const updatedUser = await user.save({validateBeforeSave : false})

    if(!updatedUser){
        return res.status(501).json(
            new ApiError(501, "Server Error Not update")
        )
    }

    if(oldImageId){
        const deleteResult = await deleteImagesFromCloudinary([oldImageId])
    }
    
    return res.status(200).json(
        new ApiResponse(200, {}, "CoverImage Successfully Updated")
    )
    
} catch (error) {
    await deleteImagesFromCloudinary([coverImage.public_id])
    fs.unlink(req.file?.path)
    return res.status(400).json(
        new ApiError(400, error?.message)
    )
}

})

const getUserChannelProfile = asyncHandler(async(req,res) => {
    const {username} = req.params

    console.log(username)
    if(!username?.trim()){
        return res.status(404).json(
            new ApiError(401, "Username Not Received in Backedn")
        )
    }

    // console.log(req.user)
    // console.log(req.user._id)

    const channel = await User.aggregate([
        {
            $match: {
                username: username?.toLowerCase(),
            },
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers",
               
            },
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "subscriber",
                as: "subscribeTo",
               
            },
        },
        // {
        //     $lookup : {
        //         from : "users",
        //         localField : "subscribers.subscriber",
        //         foreignField : "_id",
        //         as : "SubscriberDetails",
        //         pipeline : [
        //             {
        //                 $project : {
        //                     fullname : 1
        //                 }
        //             }
        //         ]
        //     }
        // },
        // {
        //     $lookup : {
        //         from : "users",
        //         localField : "subscribeTo.channel",
        //         foreignField : "_id",
        //         as : "SubscribeToDetails",
        //         pipeline: [
        //             {
        //                 $project : {
        //                     fullname : 1
        //                 }
        //             }
        //         ]
        //     }
        // },
        {
            $addFields: {
                subscribersCount: { $size: "$subscribers" },
                channelSubscribeToCount: { $size: "$subscribeTo" },
                isSubscribedTo: {
                    $cond: {
                        if: { $in: [req.user?._id, "$subscribers.subscriber"] },
                        then: true,
                        else: false,
                    },
                },
            },
        },
        {
            $project: {
                fullname: 1,
                username: 1,
                subscribersCount: 1,
                channelSubscribeToCount: 1,
                isSubscribedTo: 1,
                avatar: 1,
                coverImage: 1,
                email: 1,
                // SubscriberDetails : 1,
                // SubscribeToDetails : 1
                  // Ensure to project subscribers details in the final output

            },
        },
    ]);
    
   
    if (!channel?.length) {
        return res.status(400).json(
            new ApiError(400, "Channel Doesn;t Exists")
        )
    }
    
    return res.status(200).json(
        new ApiResponse(
            200,
            channel[0],
            "User Channel Fetched Successfully"
        )
    );
})    







export {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    refreshAccessToken,
    checkUsernameAvailable,
    updatePersonalDetails,
    updateChannelInformation,
    ChangePassword,
    updateAvatar,
    updatecoverImage,
    getUserChannelProfile
}