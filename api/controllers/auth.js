//Auth Controller functionality for User Registering & Login
import bcrypt from "bcrypt";
import User from "../models/User.js";
import ErrorHandler from "../middleware/error.js";

//REGISTER
export const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            username, email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            userInfo: user
        })
    } catch (error) {
        next(error);
    }
};

//LOGIN
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const { password, ...others } = user._doc;
                res.status(200).json({
                    success: true,
                    userInfo: others
                })
            }

            else
                return next(new ErrorHandler("Password is incorrect"));
        }

        else
            return next(new ErrorHandler("User not found", 404));


    } catch (error) {
        next(error)
    }
}