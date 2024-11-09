import { Router } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";
import { registerUser } from "../Controllers/user.controllers.js";
import { upload } from "../Middlewares/multer.middleware.js";

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

export default route;