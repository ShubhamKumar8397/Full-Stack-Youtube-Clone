import { User } from "../Models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import jwt from "jsonWebToken"


const verifyJWTOptional = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization").replace("Bearer", "")

        if (token) {
            try {
                const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
                const user = await User.findById(decodedToken._id).select(" -password, -refreshToken")
                if (user) {
                    req.user = user
                }
            } catch (innerError) {
                return res.status(401).json(
                    new ApiError(401, innerError?.message)
                )
            }
        }

        next()

    } catch (error) {
        next()
    }
}

export { verifyJWTOptional }