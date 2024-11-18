import { Router } from "express"
import { verifyJWt } from "../Middlewares/verifyJwt.js"
import { upload } from "../Middlewares/multer.middleware.js"
import { publishVideo } from "../Controllers/video.controller.js"

const route = Router()


route.post("/publishVideo",
    upload.fields([
        {
            name : 'videoFile',
            maxCount : 1
        },
        {
            name : "thumbnail",
            maxCount : 1
        }
    ]),
    verifyJWt,
    publishVideo
)


export default route