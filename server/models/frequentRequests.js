import mongoose from "mongoose";

const frequentRequestsSchema = mongoose.Schema({
    title: String,
    count: Number,
    previewUrl: String,
    link: String,
});

export default mongoose.model('FrequentRequests', frequentRequestsSchema);