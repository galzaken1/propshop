import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/userModel.js';
import generateToken from '../utils/token.js';
// @desc Auth user and get token
// @route post /api/users/login
// @access login

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin

        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password');
    }

})
// @desc Register user and get token
// @route post /api/users/
// @access public

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
        res.status(400);
        throw new Error('User already exists')
    };
    const user = await User.create({
        name,
        email,
        password
    })
    if (user) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }



})


// @desc Logout user and clear cockie
// @route post /api/users/logout
// @access private

const logoutUser = asyncHandler(async (req, res) => {

    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({ message: 'Logged out succesfully' })

})

// @desc get user profile
// @route get /api/users/profile
// @access private

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })

    } else {
        res.status(404);
        throw new Error('User not found');
    }

})
// @desc update user profile
// @route post /api/users/profile
// @access private

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.emila || user.email
        if (req.body.password) {
            user.password = req.body.password
        };
        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin

        })

    } else {
        res.status(404);
        throw new Error('User not found');
    }
})

// @desc get all users
// @route get /api/users/
// @access private/admin

const getUsers = asyncHandler(async (req, res) => {
    res.send('get users by admin')

})
// @desc delete user
// @route get /api/users/:id
// @access private/admin

const deleteUser = asyncHandler(async (req, res) => {
    res.send('delete user')
})

// @desc get user by id
// @route get /api/users/:id
// @access private/admin

const getUserById = asyncHandler(async (req, res) => {
    res.send('get user by admin')

})


// @desc get all users
// @route post /api/users/
// @access private/admin

const updateUser = asyncHandler(async (req, res) => {
    res.send('get admin update user')

})

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUsers, deleteUser, getUserById, updateUser }





