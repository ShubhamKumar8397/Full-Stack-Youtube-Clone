import { Router } from "express";
import { 
    checkUsernameAvailable,
    getCurrentUser, 
    loginUser, 
    logoutUser, 
    refreshAccessToken, 
    registerUser } from "../Controllers/user.controllers.js";
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
    

    // additional utils route

    route.post('/usernameAvailable', checkUsernameAvailable )
   

export default route;