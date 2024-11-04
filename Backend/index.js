
import dotenv from "dotenv"
import connectDB from "./src/DB/connectDB.js";
import {app} from "./app.js"

dotenv.config({
    path : "/.env"
})


connectDB()
.then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`App is Listening at ::: http://localhost:${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log(`Connect To DB ERR !!! - ${err}`)
})

