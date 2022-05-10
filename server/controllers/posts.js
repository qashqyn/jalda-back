import mongoose from "mongoose";
import category from "../models/category.js";
import Post from "../models/post.js";
import User from "../models/user.js";

export const getPosts = async (req, res) => {
    const { category, search, page: pg, sort } = req.query;
    try{
        let page = 1;
        if(pg)
            page = pg;
        const LIMIT = 6;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await Post.countDocuments({});

        const sorting = '-postDate';
    
        if(sort)
            switch(sort){
                case 'rating':
                    sorting = '-rating';
                    break;
                case 'priceInc':
                    sorting = 'price';
                    break;
                case 'priceDec':
                    sorting = '-price';
                    break;
                default:
                    sorting = '-postDate';
            }


        var query;
        if(!category && !search){
            query = await Post.find().select('authorID title images rating description postData').populate({path: 'authorID', select: 'name image phoneNumber telegram whatsapp'}).sort(sorting).limit(LIMIT).skip(startIndex);
        }else if(category && !search){
            query = await Post.find().where('category').in(category.split(',')).populate({path: 'authorID', select: 'name image phoneNumber telegram whatsapp'}).select('authorID title images rating description postData').sort(sorting).limit(LIMIT).skip(startIndex);
        }else if(!category && search){
            query = await Post.find({$text: {$search: search}}).populate({path: 'authorID', select: 'name image phoneNumber telegram whatsapp'}).select('authorID title images rating description postData').sort(sorting).limit(LIMIT).skip(startIndex);
        }else{
            query = await Post.find({$text: {$search: search}}).where('category').in(category.split(',')).populate({path: 'authorID', select: 'name image phoneNumber telegram whatsapp'}).select('authorID title images rating description postData').sort(sorting).limit(LIMIT).skip(startIndex);
        }
        let arr = query.map((post) => {
            if(post.images)
                return {...post._doc, postID: post._doc._id, image: post.images[0], images: null};
            else
                return {...post._doc, postID: post._doc._id, image: null};    
        });
        
        res.status(200).json({data: arr, currentPage:Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    }catch(error){
        console.log(error);
        res.status(404).json(error);
    }
};

export const getPost = async (req, res) => {
    const { id } = req.params;

    try{
        const post = await Post.findById(id);
        post.populate({
            path: 'review',
            strictPopulate: false,
            populate: 'userID'
        })
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