
import { bookingService } from "../services/bookingService.js";

export const createBooking = async (req, res) => {
    try {
        const newBooking = await bookingService.createBooking({
            ...req.body,
            userId: req.userId
        });
        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: newBooking
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const getBookings = async (req, res) => {
    try {
        const bookings = await bookingService.getBookings(req.userId, req.user.role);
        res.status(200).json({
            success: true,
            message: "Bookings retrieved successfully",
            data: bookings
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

export const getSingleBooking = async (req, res) => {
    try {
        const booking = await bookingService.getSingleBooking(req.params.id);
        res.status(200).json({
            success: true,
            message: "Booking found",
            data: booking
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

export const updateBookingStatus = async (req, res) => {
    try {
        const updatedBooking = await bookingService.updateBookingStatus(
            req.params.id,
            req.body.status,
            req.userId
        );
        res.status(200).json({
            success: true,
            message: "Booking status updated successfully",
            data: updatedBooking
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};