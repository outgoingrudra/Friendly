import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "Guest User",
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: "I love to use Friendly"
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        lowercase: true
    },
    city: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        default: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Twitter_default_profile_400x400.png/250px-Twitter_default_profile_400x400.png"
    }
}, { timestamps: true });

export default mongoose.model("User", userSchema);