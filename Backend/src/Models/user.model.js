import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonWebToken"

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
    userChannelDescription:{
        type : String
    }
    
},{timestamps:true})


userSchema.pre('save', async function(next){
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next();
})


userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async function(){
    return jwt.sign(
        {
            _id : this._id,
            username : this.username,
            email : this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = async function(){
    return jwt.sign(
        {
            _id : this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}



export const User = mongoose.model("User", userSchema )