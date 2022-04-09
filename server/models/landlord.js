import mongoose from "mongoose";

const landlordSchema = mongoose.Schema({
    authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    companyName: {type: String, required: true},
    fullName: {type: String, required: true},
    iinNumber: {type: String, required: true}
});

export default mongoose.model('Landlord', landlordSchema);