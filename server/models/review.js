import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    postID: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    postDate: {type: Date, default: Date.now()},
    rating: {type: mongoose.Types.Decimal128, default: 0},
    text: {type: String, required: true}
});

export default mongoose.model('Review', reviewSchema);