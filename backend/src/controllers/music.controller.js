const musicModel = require("../models/music.model")
const storageService = require("../services/storage.service")

const createMusic = async (req, res) => {

    try {
        const {title} = req.body
        const file = req.file

        if(!title || !file) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const musicFile = await storageService.uploadMusic(file)

        const music = await new musicModel({
            uri: musicFile.url,
            title,
            artist: req.user.id
        }).save()

        return res.status(201).json({
            message: "Music uploaded successfully",
            music: {
                _id: music.id,
                uri: music.uri, 
                title: music.title,
                artist: music.artist
            }
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports =  { createMusic }
