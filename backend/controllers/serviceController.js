// controllers/service.controller.js
import { serviceService } from "../services/serviceService.js";

export const createService = async (req, res) => {
    try {
        console.log('Create Service Request Body:', req.body); // Debug request payload
        const newService = await serviceService.createService({
            ...req.body,
            provider: req.userId
        });
        res.status(201).json({
            success: true,
            message: "Service created successfully",
            data: newService
        });
    } catch (error) {
        console.error('Create Service Error:', error); // Debug error
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
 };
 
export const updateService = async (req, res) => {
   try {
       const updatedService = await serviceService.updateService(
           req.params.id,
           req.userId,
           req.body
       );
       res.status(200).json({
           success: true,
           message: "Service updated successfully",
           data: updatedService
       });
   } catch (error) {
       res.status(400).json({
           success: false,
           message: error.message
       });
   }
};

export const deleteService = async (req, res) => {
   try {
       await serviceService.deleteService(req.params.id, req.userId);
       res.status(200).json({
           success: true,
           message: "Service deleted successfully"
       });
   } catch (error) {
       res.status(400).json({
           success: false,
           message: error.message
       });
   }
};

export const getSingleService = async (req, res) => {
   try {
       const service = await serviceService.getSingleService(req.params.id);
       res.status(200).json({
           success: true,
           message: "Service found",
           data: service
       });
   } catch (error) {
       res.status(404).json({
           success: false,
           message: error.message
       });
   }
};

export const getAllServices = async (req, res) => {
   try {
       const services = await serviceService.getAllServices();
       res.status(200).json({
           success: true,
           message: "Services found",
           data: services
       });
   } catch (error) {
       res.status(404).json({
           success: false,
           message: error.message
       });
   }
};

export const getServicesByProvider = async (req, res) => {
   try {
       const services = await serviceService.getServicesByProvider(req.userId);
       res.status(200).json({
           success: true,
           message: "Provider services found",
           data: services
       });
   } catch (error) {
       res.status(404).json({
           success: false,
           message: error.message
       });
   }
};