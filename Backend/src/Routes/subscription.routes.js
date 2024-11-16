import { Router } from "express";
import { verifyJWt } from "../Middlewares/verifyJwt.js";
import { subscribeToChannel, unsubscribeToChannel } from "../Controllers/subscription.controllers.js";

const route = Router()

route.post('/subscribeToChannel/:username', verifyJWt, subscribeToChannel)
route.delete('/unsubscribeToChannel/:username', verifyJWt, unsubscribeToChannel)

export default route