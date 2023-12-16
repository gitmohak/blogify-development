import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    photo: {
        type: String,
        default: ""
    },

    username: {
        type: String,
        required: true
    },
    
    categories: Array
}, 
{ timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;