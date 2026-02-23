const albumModel = require("../models/album.model")
const storageService = require("../services/storage.service")

const createAlbum = async (req, res) => {
    try {
        const {title, musicIds} = req.body

        const album = await new albumModel({
            title,
            musics: musicIds,
            artist: req.user.id
        }).save()

        return res.status(201).json({
            message: "Album created successfully",
            album: {
                _id: album.id,
                title: album.title,
                musics: album.musics,
                artist: album.artist
            }
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports = { createAlbum }
