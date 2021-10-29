const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const chalk = require("chalk")
require("dotenv").config()
const authRouter = require("./routers/auth")


const server = express()
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log(chalk.blue("DB is connected")))
    .catch(() => console.log(chalk.red("DB is not connected")))

server.use(cors())
server.use(express.json())

server.use("/api/v1",authRouter)



const port = 8080
server.listen(process.env.PORT || port, () =>{
    console.log(chalk.magenta(`Server is started on the ${port}`))
})