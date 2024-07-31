import mongoose, { Schema } from "mongoose";


export const userSchema = new Schema({
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    password: String,
    isDeleted: {
        type: Boolean,
        default: false,
    }
});

export const User = mongoose.model("users", userSchema);
