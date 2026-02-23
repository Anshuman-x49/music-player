const { ImageKit } = require("@imagekit/nodejs")

const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
})

const uploadMusic = async (file) => {
    const music = await client.files.upload({
        file: file.buffer.toString("base64"),
        fileName: "music" + Date.now(),
        folder: "music"
    })
    return music
}

module.exports = { uploadMusic }