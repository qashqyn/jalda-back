import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'Landlord', required: true},
    title: {type: String, required: true},
    images: [{} ],
    category: {type: [String], required: true},
    rating: {type: mongoose.Types.Decimal128, default: 0},
    description: {type: String, required: true},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    price: {type: Number, default: 0},
    address: String,
    area: {type: Number, default: 0},
    capacity: {
        min: { 
            type: Number, min: 0,
            validate: {
                validator: function(val){
                    const currMax = this.target.capacity.range.max;
                    return (currMax !== undefined ? val <= currMax : true);
                },
                message: "The MIN range with value {VALUE} must be <= than the max range!"
            }
        },
        max: { 
            type: Number, min: 0,
            validate: {
                validator: function(val) {
                    const currMin = this.target.capacity.range.min;
                    return (currMin !== undefined ? val >= currMin : true);
                },
                message: "The MAX range with value {VALUE} must be >= than the min range!"
            }
        }
    },
    takeaway_food: {type: Boolean, default: false},
    sex: String,
    size: String,
    color: String
});

export default mongoose.model('Post', postSchema);