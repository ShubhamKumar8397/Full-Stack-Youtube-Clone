import { Router } from "express"
import { verifyJWt } from "../Middlewares/verifyJwt.js"
import { upload } from "../Middlewares/multer.middleware.js"
import { deleteVideo, publishVideo, tooglePublishVideo, updateVideo } from "../Controllers/video.controller.js"

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
    publishVideo,
)

route.patch("/updateVideo", upload.single('thumbnail'), verifyJWt, updateVideo)
route.patch("/tooglePublishedVideo", verifyJWt, tooglePublishVideo )
route.delete("/deleteVideo", verifyJWt, deleteVideo )


export default route