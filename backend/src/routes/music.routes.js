const express = require("express")
const musicController = require("../controllers/music.controller")
const albumController = require("../controllers/album.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const multer = require("multer")

const upload = multer({storage: multer.memoryStorage()})

const router = express.Router()

router.post("/upload", authMiddleware.authArtist, upload.single("file"), musicController.createMusic)

router.post("/create-album", authMiddleware.authArtist, albumController.createAlbum)


module.exports = router