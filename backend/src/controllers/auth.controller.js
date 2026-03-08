const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")


const registerUser = async (req, res) => {
    try {
        
        const { username, email, password, role="user" } = req.body

        const isUserExist = await userModel.findOne({
            $or: [
                { username},
                {email}
            ]
        })

        if(isUserExist) {
            return res.status(409).json({
                message: "User already exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            username,
            email,
            password: hashedPassword,
            role
        })

        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET)

        res.cookie("token", token)

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        })

    } catch (error) {
        console.log("Error in user registration : ", error);
    }
}

const LoginUser = async (req, res) => {
    try {

        const { username, email, password } = req.body

        const user = await userModel.findOne({
            $or: [
                { username},
                {email}
            ]
        })

        if(!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid password"
            })
        }

        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET)

        res.cookie("token", token)

        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        })

    }catch(error) {
        console.log("Error in user login : ", error);
    }
}

const getMe = async (req, res) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ message: "Not authenticated" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.id).select("-password")

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        return res.status(200).json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" })
    }
}

const logoutUser = (req, res) => {
    res.clearCookie("token")
    return res.status(200).json({ message: "Logged out successfully" })
}

module.exports = { registerUser, LoginUser, getMe, logoutUser }