import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true},
    images: [String ],
    category: {type: [String], required: true},
    rating: {
        rate_1: Number,
        rate_2: Number,
        rate_3: Number,
        rate_4: Number,
        rate_5: Number
    },
    raters: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    description: {type: String, required: true},
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
    price: {type: Number, default: 0, required: true},
    fields: [{
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