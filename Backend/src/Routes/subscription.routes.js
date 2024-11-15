import { Router } from "express";
import { verifyJWt } from "../Middlewares/verifyJwt.js";
import { subscribeToChannel } from "../Controllers/subscription.controllers.js";

const route = Router()

route.post('/subscribeToChannel', verifyJWt, subscribeToChannel)


export default route