//User Controller functionality for Getting, Deleting and Updating the user information.
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Post from "../models/Post.js";
import ErrorHandler from "../middleware/error.js";

//UPDATE
export const updateUser = async (req, res, next) => {
    const { id } = req.params;

    if (req.body.userId === id) {
        try {
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }
            const oldUser = await User.findById(id);

            if(oldUser.username !== req.body.username) {
                await Post.updateMany(
                    {username: oldUser.username},
                    {$set: {username: req.body.username}}
                )
            }

            const updatedUser = await User.findByIdAndUpdate(id,
                { $set: req.body },
                { new: true })
                .select("+password");

            res.status(200).json({
                success: true,
                userInfo: updatedUser
            });

        } catch (error) {
            next(error)
        }
    }

    else
        return next(new ErrorHandler("User ID is defective", 401));
};

//DELETE
export const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    const { username } = req.body;

    if (req.body.userId === id) {
        try {
            const user = await User.findByIdAndDelete(id);
            const posts = await Post.deleteMany({ username });

            res.status(200).json({
                success: true,
                message: "User deleted successfully",
                userInfo: user,
                posts
            });
        } catch (error) {
            next(error)
        }
    }

    else
        return next(new ErrorHandler("User ID is defective", 401));
};

//GET A USER
export const getUser = async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        res.status(200).json({
            success: true,
            userInfo: user
        })

    } catch (error) {
        return next(new ErrorHandler("User not found", 404));
    }
};