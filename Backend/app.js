import cookieParser from "cookie-parser";
import express from "express"
import cors from "cors"
const app = express();

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    CredentialS : true,
}))

app.use(express.json({limit : "16kb"}))
// app.use(express.urlencoded({limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


// Routes:::

import userRouter from "./src/Routes/user.routes.js"

app.use("/v1/api/users" , userRouter)



export {app}