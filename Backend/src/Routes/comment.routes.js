import express, {Router} from "express"
import { verifyJWt } from "../Middlewares/verifyJwt.js"
import { verifyJWTOptional } from "../Middlewares/verifyJWTOptional.js"
import { createCommentOnVideo, deleteComment, getAllVideoComments, updateComments } from "../Controllers/comment.controller.js"

const route = Router()

route.post("/createVideoComment/:videoId", verifyJWt, createCommentOnVideo)
route.get("/getAllVideoComments/:videoId", verifyJWTOptional , getAllVideoComments )
route.post('/updateComment', verifyJWt, updateComments)
route.post('/deleteComment', verifyJWt, deleteComment)

export default route