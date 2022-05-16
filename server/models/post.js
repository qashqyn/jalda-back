import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    authorID: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true},
    images: [String ],
    category: {type: [String], required: true},
    rating: {type: Number, default: 0},
    raters: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    description: {type: String, required: true},
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
    price: {type: Number, default: 0, required: true},
    fields: [{
        isNecessary: {type: Boolean, default: false},
        name: {type: String, required: true},
        info: {type: String},
    }],
    postDate: {
        type: Date,
        default: new Date()
    }
});
postSchema.index({'$**': 'text'});
export default mongoose.model('Post', postSchema);