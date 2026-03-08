const express =  require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const authRoutes = require("./routes/auth.routes")
const musicRoutes = require("./routes/music.routes")

const app = express()
app.use(cors({
    origin: "http://localhost:5174",
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


app.use("/api/auth", authRoutes)
app.use("/api/music", musicRoutes)


module.exports = app
