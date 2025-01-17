// services/review.service.js
import Review from "../models/review.js";
import Booking from "../models/booking.js";

export const reviewService = {
    async createReview(reviewData) {
        // Verify booking exists and is completed
        const booking = await Booking.findById(reviewData.bookingId);
        if (!booking) {
            throw new Error("Booking not found");
        }
        if (booking.status !== "completed") {
            throw new Error("Cannot review uncompleted service");
        }

        // Check if review already exists
        const existingReview = await Review.findOne({ booking: reviewData.bookingId });
        if (existingReview) {
            throw new Error("Review already exists for this booking");
        }

        const newReview = new Review({
            service: booking.service,
            user: reviewData.user,
            provider: booking.provider,
            booking: booking._id,
            rating: reviewData.rating,
            reviewText: reviewData.reviewText
        });

        await newReview.save();
        return await newReview.populate([
            { path: "user", select: "name photo" },
            { path: "service" }
        ]);
    },

    async getServiceReviews(serviceId) {
        return await Review.find({ service: serviceId })
            .populate("user", "name photo")
            .populate("booking")
            .sort("-createdAt");
    },

    async getProviderReviews(providerId) {
        return await Review.find({ provider: providerId })
            .populate("user", "name photo")
            .populate("service")
            .populate("booking")
            .sort("-createdAt");
    },

    async updateReview(reviewId, userId, updateData) {
        const review = await Review.findOne({
            _id: reviewId,
            user: userId
        });

        if (!review) {
            throw new Error("Review not found or unauthorized");
        }

        const updatedReview = await Review.findByIdAndUpdate(
            reviewId,
            { $set: updateData },
            { new: true }
        ).populate("user", "name photo");

        return updatedReview;
    }
};