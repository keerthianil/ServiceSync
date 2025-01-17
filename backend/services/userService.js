// services/user.service.js
import User from "../models/user.js";
import Booking from "../models/booking.js";

export const userService = {
    async updateUser(userId, updateData) {
        const user = await User.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { new: true }
        ).select("-password");

        if (!user) {
            throw new Error("User not found");
        }
        return user;
    },

    async deleteUser(userId) {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        await User.findByIdAndDelete(userId);
        return true;
    },

    async getSingleUser(userId) {
        const user = await User.findById(userId).select("-password");
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    },

    async getAllUsers() {
        return await User.find().select("-password");
    },

    async getUserProfile(userId) {
        const user = await User.findById(userId).select("-password");
        if (!user) {
            throw new Error("User not found");
        }

        const bookings = await Booking.find({ user: userId })
            .populate("service")
            .populate("provider");

        return { user, bookings };
    }
};