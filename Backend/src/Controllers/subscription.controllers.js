import { Subscription } from "../Models/subscription.model.js";
import { User } from "../Models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const subscribeToChannel = asyncHandler(async(req, res) => {
    // hey this is the username the channel you subscribe
    const {username} = req.body

    if(!username){
        return res.status(404).json(
            new ApiError(404, "Username For the channel U Subscribe not found")
        )
    }
    const channel = await User.findOne({username})

    if(req.user._id.toString() === channel._id.toString()){
        return res.status(400).json(
            new ApiError(400, "You Not Subscribed To Yourself")
        )
    }
    
    if(!channel){
        return res.status(404).json(
            new ApiError(404, "Channel You want to subscribe not found")
        )
    }

    

    const existingSubscription = await Subscription.findOne({
        subscriber : req.user._id,
        channel : channel._id
    })

    if(existingSubscription){
        return res.status(401).json(
            new ApiError(401, "Hey You Already subscribed To this Channel")
        )
    }

    const subscription = await Subscription.create({
        subscriber : req.user._id,
        channel : channel._id
    })

    if(!subscription){
        return res.status(501).json(
            new ApiError(501, "Server Error !! Not Subscribe")
        )
    }

    return res.status(200).json(
        new ApiResponse(200, subscription, "Channel Subscribed Successfully")
    )
    
})


export {
    subscribeToChannel,
}