import { Router } from "express";
import { ApiResponse } from "../src/utils/ApiResponse.js";

const route = Router()

route.post('/signup', (req, res) => {
    return res.status(201).json(
        new ApiResponse(200, req.body, "All done success")
    )
})

export default route;