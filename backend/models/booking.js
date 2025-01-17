
import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    service: {
        type: mongoose.Types.ObjectId,
        ref: "Service",
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    provider: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    price: { 
        type: Number, 
        required: true 
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    appointmentTime: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "completed", "cancelled"],
        default: "pending"
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "completed", "refunded"],
        default: "pending"
    },
    notes: { 
        type: String 
    }
}, { timestamps: true });

export default mongoose.model("Booking", BookingSchema);