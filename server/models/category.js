import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    title: { type: String, required: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null},
    necessaryFields: {type: [String], default: ["price", "address"]}
});

export default mongoose.model('Category', categorySchema);