import bcrypt from "bcrypt";
import User from "../models/User.js";
import Post from "../models/Post.js";
import ErrorHandler from "../middleware/error.js";

//UPDATE
const updateUser = async (req, res, next) => {
    const { id } = req.params;

    if (req.body.userId === id) {
        try {
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }

            const updatedUser = await User.findByIdAndUpdate(id,
                { $set: req.body },
                { new: true })
                .select("+password");

            res.status(200).json({
                success: true,
                user: updatedUser
            });

        } catch (error) {
            next(error)
        }
    }

    else
        return next(new ErrorHandler("User ID is defective", 401));
};

//DELETE
const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    const { username } = req.body;

    if (req.body.userId === id) {
        try {
            const user = await User.findByIdAndDelete(id);
            const posts = await Post.deleteMany({ username });

            res.status(200).json({
                success: true,
                message: "User deleted successfully",
                user,
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
const getUser = async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        return next(new ErrorHandler("User not found", 404));
    }
};

export {updateUser, deleteUser, getUser};