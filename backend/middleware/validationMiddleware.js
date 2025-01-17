
import { check, validationResult } from "express-validator";

export const validateRegistration = [
    check("name")
        .notEmpty()
        .withMessage("Name is required")
        .trim(),
    check("email")
        .isEmail()
        .withMessage("Invalid email address")
        .normalizeEmail(),
    check("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        .matches(/\d/)
        .withMessage("Password must contain a number"),
    check("phone")
        .notEmpty()
        .withMessage("Phone number is required")
        .matches(/^[0-9]{10}$/)
        .withMessage("Enter a valid 10-digit phone number"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: errors.array()
            });
        }
        next();
    }
];

export const validateService = [
    check("title")
        .notEmpty()
        .withMessage("Title is required")
        .trim(),
    check("description")
        .notEmpty()
        .withMessage("Description is required")
        .trim(),
    check("category")
        .notEmpty()
        .withMessage("Category is required")
        .isIn(['plumbing', 'electrical', 'carpentry', 'cleaning', 'painting', 'other'])
        .withMessage("Invalid category"),
    check("price")
        .isNumeric()
        .withMessage("Price must be a number")
        .isFloat({ min: 0 })
        .withMessage("Price cannot be negative"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: errors.array()
            });
        }
        next();
    }
];

export const validateBooking = [
    check("serviceId")
        .notEmpty()
        .withMessage("Service ID is required")
        .isMongoId()
        .withMessage("Invalid service ID"),
    check("appointmentDate")
        .isISO8601()
        .withMessage("Valid appointment date is required")
        .custom(value => {
            if (new Date(value) < new Date()) {
                throw new Error('Appointment date must be in the future');
            }
            return true;
        }),
    check("appointmentTime")
        .notEmpty()
        .withMessage("Appointment time is required")
        .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
        .withMessage("Time must be in HH:MM format"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: errors.array()
            });
        }
        next();
    }
];