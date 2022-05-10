import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, unique : true, required: true},
    phoneNumber: {type: String},
    telegram: {type: String, default: null},
    whatsapp: {type: String, default: null},
    birthDate: { type: Date},
    password: {type: String, required: true},
    favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    companyName: String,
    iinNumber: {type: String, unique: true},
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
    }],
    image: {type: String, default: null},
    crediCard: {type: mongoose.Schema.Types.ObjectId, ref: 'CreditCard', unique: true}

});

export default mongoose.model('User', userSchema);