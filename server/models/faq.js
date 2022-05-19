import mongoose from "mongoose";

const faqSchema = mongoose.Schema({
    title: {type: String, required: true},
    content: [String],
    countable: Boolean
});

export default mongoose.model('FAQ', faqSchema);