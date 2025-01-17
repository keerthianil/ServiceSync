
import mongoose from "mongoose";
import Service from "./service.js";

const ReviewSchema = new mongoose.Schema({
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
    booking: {
        type: mongoose.Types.ObjectId,
        ref: "Booking",
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    reviewText: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Calculate average rating after saving review
ReviewSchema.statics.calcAverageRatings = async function(serviceId) {
    const stats = await this.aggregate([
        {
            $match: { service: serviceId }
        },
        {
            $group: {
                _id: "$service",
                numOfRating: { $sum: 1 },
                avgRating: { $avg: "$rating" }
            }
        }
    ]);

    if (stats.length > 0) {
        await Service.findByIdAndUpdate(serviceId, {
            totalRating: stats[0].numOfRating,
            averageRating: stats[0].avgRating
        });
    }
};

ReviewSchema.post('save', function() {
    this.constructor.calcAverageRatings(this.service);
});

export default mongoose.model("Review", ReviewSchema);