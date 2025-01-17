
import Booking from "../models/booking.js";
import Service from "../models/service.js";

export const bookingService = {
    async createBooking(bookingData) {
        const service = await Service.findById(bookingData.serviceId);
        if (!service) {
            throw new Error("Service not found");
        }

        const newBooking = new Booking({
            service: bookingData.serviceId,
            user: bookingData.userId,
            provider: service.provider,
            price: service.price,
            appointmentDate: bookingData.appointmentDate,
            appointmentTime: bookingData.appointmentTime,
            notes: bookingData.notes
        });

        await newBooking.save();
        return await newBooking.populate([
            { path: "service" },
            { path: "user", select: "-password" },
            { path: "provider", select: "-password" }
        ]);
    },

    async getBookings(userId, userRole) {
        let query = {};

        if (userRole === "customer") {
            query.user = userId;
        } else if (userRole === "service_provider") {
            query.provider = userId;
        }

        return await Booking.find(query)
            .populate("service")
            .populate("user", "-password")
            .populate("provider", "-password")
            .sort("-createdAt");
    },

    async getSingleBooking(bookingId) {
        const booking = await Booking.findById(bookingId)
            .populate("service")
            .populate("user", "-password")
            .populate("provider", "-password");

        if (!booking) {
            throw new Error("Booking not found");
        }
        return booking;
    },

    async updateBookingStatus(bookingId, status, userId) {
        const booking = await Booking.findOne({
            _id: bookingId,
            $or: [{ user: userId }, { provider: userId }]
        });

        if (!booking) {
            throw new Error("Booking not found or unauthorized");
        }

        booking.status = status;
        await booking.save();

        return await booking.populate([
            { path: "service" },
            { path: "user", select: "-password" },
            { path: "provider", select: "-password" }
        ]);
    }
};