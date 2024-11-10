import { User } from "../Models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import jwt from "jsonWebToken"


const verifyJWt = async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization").replace("Bearer" , "")
        if(!token){
            throw new ApiError(404, "Please Login to continue")
        }
    
        const decodedToken =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken._id).select(" -password, -refreshToken")
    
        if(!user){
            throw new ApiError(
                404 , "Token is Expired or unautorized Req"
            )
        }

        req.user = user
        next()
    } catch (error) {
        throw new ApiError(404, error?.message || "invalid access token")
    }
}

export {verifyJWt}