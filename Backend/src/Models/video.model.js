import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const moreDetails = {
    url : {
        type : String,
        required : true,
    },
    id : {
        type : String,
        required : true,
    }
}

const videoSchema = new Schema({
    videoFile: moreDetails,
    thumbnail : moreDetails,
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    title:{
        type : String,
        required : true,
        min : [5, "title is too short"],
        max : [100, "title is too Long"]
    }, 
    description : {
        type : String,
        required : true,
        max : [500, "Description is too Long"]
    },
    duration : {
        type : String,
        required : true
    },
    views : {
        type : Number,
        default : 0
    },
    isPublished : {
        type : Boolean,
        default : true
    }
}, {timestamps : true})

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema )