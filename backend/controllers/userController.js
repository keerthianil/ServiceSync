
import { userService } from "../services/userService.js";

export const updateUser = async (req, res) => {
   try {
       const updatedUser = await userService.updateUser(req.params.id, req.body);
       res.status(200).json({
           success: true,
           message: "Successfully updated",
           data: updatedUser,
       });
   } catch (error) {
       res.status(400).json({
           success: false,
           message: error.message
       });
   }
};

export const deleteUser = async (req, res) => {
   try {
       await userService.deleteUser(req.params.id);
       res.status(200).json({
           success: true,
           message: "Successfully deleted",
       });
   } catch (error) {
       res.status(400).json({
           success: false,
           message: error.message
       });
   }
};

export const getSingleUser = async (req, res) => {
   try {
       const user = await userService.getSingleUser(req.params.id);
       res.status(200).json({
           success: true,
           message: "User found",
           data: user,
       });
   } catch (error) {
       res.status(404).json({
           success: false,
           message: error.message
       });
   }
};

export const getAllUsers = async (req, res) => {
   try {
       const users = await userService.getAllUsers();
       res.status(200).json({
           success: true,
           message: "Users found",
           data: users,
       });
   } catch (error) {
       res.status(404).json({
           success: false,
           message: error.message
       });
   }
};

export const getUserProfile = async (req, res) => {
   try {
       const result = await userService.getUserProfile(req.userId);
       res.status(200).json({
           success: true,
           message: "Profile retrieved successfully",
           data: result,
       });
   } catch (error) {
       res.status(404).json({
           success: false,
           message: error.message
       });
   }
};