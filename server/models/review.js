import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    postID: {type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true},
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    postDate: {type: Date, default: Date.now()},
    rating: {type: Number, default: 0, required: true},
    text: {type: String, default: ''}
});

export default mongoose.model('Review', reviewSchema);