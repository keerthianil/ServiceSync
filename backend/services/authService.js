
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const authService = {
    async registerUser(userData) {
        const { email, password } = userData;
        
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("User already exists");
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = new User({
            ...userData,
            password: hashedPassword,
        });

        await user.save();
        const { password: removedPassword, ...rest } = user._doc;
        return rest;
    },

    async loginUser(userData) {
        const { email, password } = userData;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }

        // Check password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            throw new Error("Invalid credentials");
        }

        // Generate token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "15d" }
        );

        const { password: removedPassword, ...rest } = user._doc;
        return { token, user: rest };
    }
};