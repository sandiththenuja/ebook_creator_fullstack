const jwt = require('jsonwebtoken')
const User = require('../models/User')

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })
}

exports.registerUser = async(req, res) => {
    const {name, email, password} = req.body

    try {
        if(!name|| !email || !password){
            return res.status(400).json({message: "Fill all fields"})
        }

        // check user exists
        const userExists = await User.findOne({email})
        if(userExists){
            return res.status(400).json({message: "User already exuxts"})
        }

        const user = await User.create({name, email, password})

        if(user){
            res.status(201).json({
                message: "User registered successfully", 
                token: generateToken(user._id)})
        }else{
            res.status(400).json({message: "Invalid user data"})
        }
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message})
    }
}

exports.loginUser = async(req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.findOne({email}).select("+password")

        if(user && (await user.matchPassword(password))){
            res.json({
                message: "Login successfull",
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        }else{
            res.status(401).json({message: "Invalid data"})
        }

        
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message})
    }
}

exports.getProfile = async(req, res) => {
    try {
        const user = await User.findById(req.user.id)
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            isPro: user.isPro
        })

        if(!user){
            res.status(404).json({message: "User not found"})
        }
        
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message})
    }
}

exports.updateUserProfile = async(req, res) => {
    try {
        const user = await User.findById(req.user.id)

        if(user){
            user.name = req.body.name || user.name

            const updateUser = await user.save()

            res.json({
                _id: updateUser._id,
                name: updateUser.name
            })
        }else{
            res.status(404).json({message: "User not found"})
        }
        
    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
}
