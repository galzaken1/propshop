import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';



const protect = asyncHandler(async (req, res, next) => {
    let token;
    //read jwt from the cookie;
    token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded); // Log the decoded token for inspection

            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (e) {
            console.log(e);
            res.status(401);
            throw new Error('Not authorized');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized');
    }
})


const admin = (req, res, next) => {
    if (req.user.isAdmin) {
        next();
    } else {
        throw new Error('Not authorized as admin');
    }
}
export { protect, admin }