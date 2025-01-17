import express from "express";
import {
  createBooking,
  getBookings,
  getSingleBooking,
  updateBookingStatus,
} from "../controllers/bookingController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authenticate); // All booking routes require authentication

router.post("/", createBooking);
router.post("/create-booking", createBooking);
router.get("/", getBookings);
router.get("/:id", getSingleBooking);
router.put(
  "/:id/status",
  authorize(["service_provider", "admin"]),
  updateBookingStatus
);

export default router;
