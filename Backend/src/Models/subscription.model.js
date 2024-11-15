import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema({
    subscriber: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    channel : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
}, {timestamps : true})

export const Subscription = mongoose.model("Subscription", subscriptionSchema)


// meri jann subscriber vo haii jo channel ko subscribe kr rha haii
// channel vo hai meri jaan jo subscriber jis channel ko subscribe kr rha haii 