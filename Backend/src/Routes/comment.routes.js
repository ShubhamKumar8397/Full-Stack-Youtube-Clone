import express, {Router} from "express"
import { verifyJWt } from "../Middlewares/verifyJwt.js"
import { createCommentOnVideo, getAllVideoComments } from "../Controllers/comment.controller.js"

const route = Router()

route.post("/createVideoComment/:videoId", verifyJWt, createCommentOnVideo)
route.get("/getAllVideoComments/:videoId", getAllVideoComments )

export default route