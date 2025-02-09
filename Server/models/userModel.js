import mongoose from "mongoose";

const userSchemma = new mongoose.Schema({

    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},

    verifyOtp: {type: String, default: ''},
    verifyOtpExpiredAt: {type: Number, default: 0},
    isAccountVerified: {type: Boolean, default: false},

    resetOtp: {type: String, default: ''},
    resetOtpExpiredAt: {type: Number, default: 0},
    
})

const userModel = mongoose.model.user || mongoose.model('user', userSchemma)

export default userModel;