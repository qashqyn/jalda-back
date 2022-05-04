import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    authorID: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true},
    images: [String ],
    category: {type: [String], required: true},
    rating: {type: mongoose.Types.Decimal128, default: 0.0},
    raters: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    description: {type: String, required: true},
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
    price: {type: Number, default: 0, required: true},
    address: String,
    area: {type: Number, default: 0},
    capacity: {
        min: { 
            type: Number, min: 0,
            validate: {
                validator: function(val){
                    const currMax = this.max;
                    return (currMax !== undefined ? val <= currMax : true);
                },
                message: "The MIN range with value {VALUE} must be <= than the max range!"
            }
        },
        max: { 
            type: Number, min: 0,
            validate: {
                validator: function(val) {
                    const currMin = this.min;
                    return (currMin !== undefined ? val >= currMin : true);
                },
                message: "The MAX range with value {VALUE} must be >= than the min range!"
            }
        }
    },
    takeaway_food: {type: Boolean, default: false},
    sex: String,
    size: String,
    color: String,
    postDate: {
        type: Date,
        default: new Date()
    }
});
postSchema.index({'$**': 'text'});
export default mongoose.model('Post', postSchema);