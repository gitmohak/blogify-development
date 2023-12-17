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

//UPDATE POST
export const updatePost = async (req, res, next) => {
    const { id } = req.params;

    try {
        let post = await Post.findById(id);

        if (post.username === req.body.username) {
            try {
                post = await Post.findByIdAndUpdate(id, {
                    $set: req.body
                }, { new: true });

                res.status(200).json({
                    success: true,
                    message: "Post Updated Succesfully",
                    post
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
    const { user, category } = req.query;

    try {
        let posts;

        if (user)
            posts = await Post.find({
                username: user
            });

        else if (category)
            posts = await Post.find({
                categories: {
                    $in: [category]
                }
            })

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