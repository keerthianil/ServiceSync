import Service from "../models/service.js";

export const serviceService = {
  async createService(serviceData) {
    const newService = new Service(serviceData);
    await newService.save();
    return await newService.populate("provider");
  },

  async updateService(serviceId, providerId, updateData) {
    const service = await Service.findOne({
      _id: serviceId,
      provider: providerId,
    });

    if (!service) {
      throw new Error("Service not found or unauthorized");
    }

    const updatedService = await Service.findByIdAndUpdate(
      serviceId,
      { $set: updateData },
      { new: true }
    ).populate("provider");

    return updatedService;
  },

  async deleteService(serviceId, providerId) {
    const service = await Service.findOne({
      _id: serviceId,
      provider: providerId,
    });

    if (!service) {
      throw new Error("Service not found or unauthorized");
    }

    await Service.findByIdAndDelete(serviceId);
    return true;
  },

  async getSingleService(serviceId) {
    const service = await Service.findById(serviceId)
      .populate("provider")
      .populate({
        path: "reviews",
        populate: { path: "user" },
      });

    if (!service) {
      throw new Error("Service not found");
    }
    return service;
  },

  async getAllServices() {
    return await Service.find(query).populate("provider").sort("-createdAt");
  },

  async getServicesByProvider(providerId) {
    return await Service.find({ provider: providerId }).populate({
      path: "reviews",
      populate: { path: "user" },
    });
  },
};
