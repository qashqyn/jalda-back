import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    login: {type: String, unique : true, required: true},
    email: {type: String, unique : true, required: true},
    phoneNumber: {type: String, required: true},
    telegram: {type: String, default: null},
    whatsapp: {type: String, default: null},
    birthDate: { type: Date, required: true},
    password: {type: String, required: true},
    favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
    }],
    image: {type: String, default: null},

});

export default mongoose.model('User', userSchema);