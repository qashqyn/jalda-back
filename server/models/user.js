import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    login: {type: String, required: true},
    email: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    birthDate: { type: Date, required: true},
    password: {type: String, required: true},
});

export default mongoose.model('User', userSchema);