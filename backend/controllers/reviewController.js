
import { reviewService } from "../services/reviewService.js";

export const createReview = async (req, res) => {
   try {
       const newReview = await reviewService.createReview({
           ...req.body,
           user: req.userId
       });
       res.status(201).json({
           success: true,
           message: "Review created successfully",
           data: newReview
       });
   } catch (error) {
       res.status(400).json({
           success: false,
           message: error.message
       });
   }
};

export const getServiceReviews = async (req, res) => {
   try {
       const reviews = await reviewService.getServiceReviews(req.params.serviceId);
       res.status(200).json({
           success: true,
           message: "Reviews retrieved successfully", 
           data: reviews
       });
   } catch (error) {
       res.status(404).json({
           success: false,
           message: error.message
       });
   }
};

export const getProviderReviews = async (req, res) => {
   try {
       const reviews = await reviewService.getProviderReviews(req.params.providerId);
       res.status(200).json({
           success: true,
           message: "Provider reviews retrieved successfully",
           data: reviews
       });
   } catch (error) {
       res.status(404).json({
           success: false,
           message: error.message
       });
   }
};

export const updateReview = async (req, res) => {
   try {
       const updatedReview = await reviewService.updateReview(
           req.params.id,
           req.userId,
           req.body
       );
       res.status(200).json({
           success: true,
           message: "Review updated successfully",
           data: updatedReview
       });
   } catch (error) {
       res.status(400).json({
           success: false,
           message: error.message
       });
   }
};