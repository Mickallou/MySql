import mongoose, { Schema } from "mongoose";


export const userSchema = new Schema({
    firstName: String,
    lastName: String,
    phone: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    isDeleted: {
        type: Boolean,
        default: false,
    },
    isBusiness: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
});

export const User = mongoose.model("users", userSchema);
