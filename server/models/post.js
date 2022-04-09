import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'Landlord', required: true},
    title: {type: String, required: true},
    images: [{} ],
    category: {type: [String], required: true},
    rating: {type: mongoose.Types.Decimal128, default: 0},
    description: {type: String, required: true},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
});

export default mongoose.model('Post', postSchema);