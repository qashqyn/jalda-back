import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name: { type: String, required: true },
    path: String,
    subcategories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null},
    necessaryFields: {type: [String], default: ["price", "address"]},
    previewImage: {type: String, default: null}
});

export default mongoose.model('Category', categorySchema);