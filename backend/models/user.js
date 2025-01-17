import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    phone: { 
        type: String, 
        required: true 
    },
    photo: { 
        type: String 
    },
    role: {
        type: String,
        enum: ["customer", "service_provider", "admin"],
        default: "customer"
    },
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String
    },
    bookings: [{ 
        type: mongoose.Types.ObjectId, 
        ref: "Booking" 
    }]
}, { timestamps: true });

// Correctly register the model without a trailing space in the name
export default mongoose.model("User", UserSchema);
