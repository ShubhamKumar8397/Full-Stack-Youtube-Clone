import { Router } from "express"
import { verifyJWt } from "../Middlewares/verifyJwt.js"
import { toggleVideoLike } from "../Controllers/like.controller.js"

const route = Router()

route.post('/toggleVideoLike/:videoId', verifyJWt, toggleVideoLike)


export default route
