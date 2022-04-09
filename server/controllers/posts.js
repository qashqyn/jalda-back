import mongoose from "mongoose";
import Post from "../models/post.js";
import User from "../models/user.js";

export const getPosts = async (req, res) => {
    try{
        const posts = await Post.find();

        res.status(200).json(posts);
    }catch(error){
        res.status(404).json(error);
    }
};

export const getPost = async (req, res) => {
    const { id } = req.params;

    try{
        const post = await Post.findById(id)
            .populate({
                path: 'comment',
                populate: { path: 'userId'}
            });
        res.status(200).json(post);
    }catch(error){
        res.status(404).json(error);
    }
};

export const createPost = async (req, res) => {
    const postData = req.body;
    const post = new Post(postData);

    try {
        await post.save();
        
        res.status(201).json(post);
    } catch (error) {
        res.status(409).json(error);
    }
};

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("No post with that ID");

    const updatedPost = await Post.findByIdAndUpdate(id, { ...post, id}, {new: true});

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("No post with that ID");
    
    await Post.findByIdAndRemove(id);

    res.json({message: 'Post deleted successfully'});
}

export const favPost = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({message: "Unaithenticated"});

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("No post with that ID");
    
    const user = await User.findById(req.userId);

    const index = user.favorites.findIndex((postId) => postId === String(id));

    if(index === -1){
        user.favorites.push(id);
    }else{
        user.favorites = user.favorites.filter((postId) => postId !== String(id));
    }

    const updatedUser = await User.findByIdAndUpdate(req.userId, user, {new: true});

    res.json(updatedUser);
}