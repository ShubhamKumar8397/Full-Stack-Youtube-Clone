import { Router } from "express";
import { 
    ChangePassword,
    checkUsernameAvailable,
    getCurrentUser, 
    getUserChannelProfile, 
    loginUser, 
    logoutUser, 
    refreshAccessToken, 
    registerUser, 
    updateAvatar, 
    updateChannelInformation, 
    updatecoverImage, 
    updatePersonalDetails} from "../Controllers/user.controllers.js";
import { upload } from "../Middlewares/multer.middleware.js";
import { verifyJWt } from "../Middlewares/verifyJwt.js";

const route = Router()

route.post('/registerUser', 

    upload.fields([
        {
            name : 'avatar',
            maxCount : 1,
        },
        {
            name : 'coverImage',
            maxCount : 1
        }
    ])
    
    , registerUser)

    route.post('/loginUser', loginUser)
    route.post('/refreshAccessToken', refreshAccessToken)

    // secure routes

    route.post('/logoutUser', verifyJWt, logoutUser)
    route.get('/getCurrentUser', verifyJWt, getCurrentUser)
    route.post('/updatePersonalDetails', verifyJWt, updatePersonalDetails)
    route.post('/updateChannelDetails', verifyJWt, updateChannelInformation)
    route.post('/changePassword', verifyJWt, ChangePassword)
    route.patch('/updateAvatar', verifyJWt, 
        upload.single('avatar'),
        updateAvatar)

    route.patch('/updateCoverImage', verifyJWt, 
        upload.single('coverImage'),
        updatecoverImage)

    route.get('/getChannelProfile', verifyJWt, getUserChannelProfile)

    // additional utils route

    route.post('/usernameAvailable', checkUsernameAvailable )
   

export default route;