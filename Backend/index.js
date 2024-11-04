import express from "express"

const app = express();
const PORT = 8000;

app.get('/papa',(req, res) => {
    res.json({"papa" : "Shubham"})
})

app.listen(PORT, () => {
    console.log("app is listening")
})