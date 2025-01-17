
import express from "express";
import {
    createReview,
    getServiceReviews,
    getProviderReviews,
    updateReview
} from "../controllers/reviewController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/service/:serviceId", getServiceReviews);
router.get("/provider/:providerId", getProviderReviews);

// Protected routes
router.use(authenticate);
router.post("/", createReview);
router.put("/:id", updateReview);

export default router;