
import express from "express";
import {
    createService,
    updateService,
    deleteService,
    getSingleService,
    getAllServices,
    getServicesByProvider
} from "../controllers/serviceController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllServices);
router.get("/:id", getSingleService);

// Protected routes
router.use(authenticate);
router.post("/", authorize(["service_provider"]), createService);
router.put("/:id", authorize(["service_provider"]), updateService);
router.delete("/:id", authorize(["service_provider", "admin"]), deleteService);
router.get("/provider/services", authorize(["service_provider"]), getServicesByProvider);

export default router;