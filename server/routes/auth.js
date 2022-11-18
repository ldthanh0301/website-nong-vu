const argon2 = require('argon2')
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const verifyToken = require('../middlewave/auth')

const User = require('../models/User')

//@route Get apo/auth
//@desc Check if user is logged in
//@access Public
router.get('/', verifyToken, async(req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password')
        if (!user) return res.status(400).json({ success: false, message: 'User not found' })
        res.json({ success: true, user })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', async(req, res) => {
    const { username, password } = req.body
        // simple validation
    if (!username || !password)
        return res
            .status(400)
            .json({ success: false, message: 'Missing username and/or Password' })
    try {
        const user = await User.findOne({ username })

        if (user)
            return res.status(400).json({ success: false, message: 'Username already' });
        // all good
        const hanshedPassword = await argon2.hash(password)
        const newUser = new User({ username, password: hanshedPassword })

        await newUser.save()

        // return token
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET)

        res.json({ success: true, message: "Tạo tài khoản thành công", accessToken })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})


// @route POST api/auth/login
// @desc login user
// @access Public
router.post('/login', async(req, res) => {
    const { username, password } = req.body
        // simple validation
    if (!username || !password)
        return res
            .status(400)
            .json({ success: false, message: 'Missing username and/or Password' })
    try {
        //check for existing user
        const user = await User.findOne({ username })

        if (!user)
            return res.status(400).json({ success: false, message: 'Incorrect username or password' })
                // user found
        const passwordValid = await argon2.verify(user.password, password)
        if (!passwordValid)
            return res.status(400).json({ success: false, message: 'Incorrect username or password' })
                //all good
                //return token
        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET)

        res.json({ success: true, message: "User login in Successfully", accessToken })
    } catch (error) {

    }
})
module.exports = router