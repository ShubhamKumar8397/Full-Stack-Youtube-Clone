import mongoose from "mongoose";
import { MONGO_DB_NAME } from "../../constants.js";


const connectDB = async () => {
    try {
        const Connection = await mongoose.connect(`${process.env.MONGO_DB_URI}/${MONGO_DB_NAME}`)
        console.log(`SUCCESSFULL CONNECT TO DBB !!! - `)
        console.log(Connection.connection.host)
        
    } catch (error) {
        console.log(`ERRR !!!! DURING CONNECTION TO DATABASE - ${error}`)
        process.exit(1)
    }
}

export default connectDB;