import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"

const imageDetails =  {
    url : {
        type : String,
    },
    id : {
        type : String,
    }
}

const userSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        index : true,
        lowercase : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        index : true,
        lowercase : true
    },
    fullname : {
        type : String,
        required : true,
    },
    avatar : imageDetails,
    coverImage : imageDetails,
    watchHistory : [
        {
            type : Schema.Types.ObjectId,
            ref : "Video"
        }
    ],
    password : {
        type  : String,
        required : true,
        min : [6, "Password Length Short"]
    },
    refreshToken : {
        type : String
    },
    
},{timestamps:true})


userSchema.pre('save', async function(next){
    if(!this.isModified("password")) return next()
    console.log(`the password coming is ${this.password}`)
    this.password = await bcrypt.hash(this.password, 10)
    next();
})




export const User = mongoose.model("User", userSchema )