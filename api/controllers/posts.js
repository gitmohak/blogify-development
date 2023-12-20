//Post Controller functionality for Getting Many Posts, Getting Single Post with queries, Creating post, and Deleting post
import Post from "../models/Post.js";
import ErrorHandler from "../middleware/error.js";

//CREATE POST
 export const createPost = async (req, res, next) => {
    try {
        const post = await Post.create(req.body);
        res.status(201).json({
            success: true,
            post
        })

    } catch (error) {
        next(error);
    }
};

//DELETE POST
export const deletePost = async (req, res, next) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);

        if (post.username === req.body.username) {
            try {
                await post.deleteOne();

                res.status(200).json({
                    success: true,
                    message: "Post Deleted Successfully"
                })

            } catch (error) {
                next(error);
            }
        }
        else
            return next(new ErrorHandler("Username is defective", 401));

    } catch (error) {
        return next(new ErrorHandler("Post not found", 404));
    }
};

//GET POST
export const getPost = async (req, res, next) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);
        res.status(200).json({
            success: true,
            post
        });

    } catch (error) {
        return next(new ErrorHandler("Post not found", 404));
    }
};

//GET MANY POSTS
export const getManyPosts = async (req, res, next) => {
    const { user } = req.query;

    try {
        let posts;

        if (user)
            posts = await Post.find({
                username: user
            });

        else
            posts = await Post.find({});

        res.status(200).json({
            success: true,
            posts
        });

    } catch (error) {
        next(error);
    }
};