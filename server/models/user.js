import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    login: {type: String, unique : true, required: true},
    email: {type: String, unique : true, required: true},
    phoneNumber: {type: String, required: true},
    birthDate: { type: Date, required: true},
    password: {type: String, required: true},
    favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
});

export default mongoose.model('User', userSchema);