import mongoose from 'mongoose';

const creditCardSchema = mongoose.Schema({
    number: {type: String, unique: true, required: true},
    name: {type: String, required: true},
    expireDate: {
        month: {type: Number, required: true},
        year: {type: Number, required: true}
    },
    cvv: {type: String, required: true},
    user: {type: String, required: true, ref: 'User', unique: true} 
});

export default mongoose.model('CreditCard', creditCardSchema);