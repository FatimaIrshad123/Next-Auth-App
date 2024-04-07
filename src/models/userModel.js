import mongoose from "mongoose";
import { Stream } from "stream";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required :[ true,'please provide username']
    },
    email: {
        type: String,
        required :[ true,'please provide email']
    },
    password: {
        type: String,
        required :[ true,'please provide password']
    },
    isVerified: {
        type: Boolean,
        required :false
    },
    isAdmin: {
        type: Boolean,
        required :false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User;