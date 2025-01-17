
import { authService } from "../services/authService.js";

export const register = async (req, res) => {
    try {
        const result = await authService.registerUser(req.body);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const result = await authService.loginUser(req.body);
        res.cookie("accessToken", result.token, {
            httpOnly: true,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });
        
        res.status(200).json({
            success: true,
            message: "Successfully logged in",
            token: result.token,
            data: result.user,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const logout = async (req, res) => {
    res.cookie("accessToken", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ 
        success: true, 
        message: "Successfully logged out" 
    });
};