
import express from "express";
import { 
    updateUser, 
    deleteUser, 
    getSingleUser, 
    getAllUsers, 
    getUserProfile 
} from "../controllers/userController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", authenticate, getUserProfile);
router.put("/:id", authenticate, updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", authenticate, getSingleUser);
router.get("/", authenticate, authorize(["admin"]), getAllUsers);

export default router;