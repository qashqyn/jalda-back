import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    postId: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    date: {type: Date, default: Date.now()},
    rating: {type: mongoose.Types.Decimal128, default: 0},
    commentText: {type: String, required: true}
});

export default mongoose.model('Comment', commentSchema);