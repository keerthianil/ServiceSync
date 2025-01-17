
import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
    provider: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    category: {
        type: String,
        required: true,
        enum: ['plumbing', 'electrical', 'carpentry', 'cleaning', 'painting', 'other']
    },
    price: { 
        type: Number, 
        required: true 
    },
    location: {
        city: String,
        state: String,
        zipCode: String
    },
    qualifications: [{
        title: String,
        institute: String,
        year: Number
    }],
    experience: [{
        title: String,
        description: String,
        years: Number
    }],
    availability: [{
        day: {
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        },
        startTime: String,
        endTime: String,
        isAvailable: { 
            type: Boolean, 
            default: true 
        }
    }],
    reviews: [{ 
        type: mongoose.Types.ObjectId, 
        ref: "Review" 
    }],
    averageRating: {
        type: Number,
        default: 0
    },
    totalRating: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ["pending", "active", "inactive"],
        default: "pending"
    }
}, { timestamps: true });

export default mongoose.model("Service", ServiceSchema);