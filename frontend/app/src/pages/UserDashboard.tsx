import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchServices = async () => {
  const response = await axios.get("http://localhost:8000/api/v1/services", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data.data;
};
const UserDashboard: React.FC = () => {
  // const [services, setServices] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    isPending,
    isError,
    data: services,
    error: errorMessage,
  } = useQuery({
    queryKey: ["get-services"],
    queryFn: fetchServices,
  });

  const handleBookingClick = async (serviceId: string, price: number) => {
    // await axios.post(
    //   "http://localhost:8000/api/v1/bookings",
    //   {
    //     service: serviceId,
    //     user: localStorage.getItem("user")._id,
    //     price,
    //   },
    //   { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    // );
    navigate(`/bookings/${serviceId}`);
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  console.log({ services });

  return (
    <div className="m-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">User Dashboard</h1>
      <h2 className="text-base">Services We Provide</h2>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : services.length > 0 ? (
        <div className="services-grid flex gap-8 flex-wrap">
          {services.map((serviceItem: any, index) => (
            <div
              key={index}
              className="service-card bg-blue-300 p-2 rounded-md w-72 h-fit shadow border border-gray-300 flex flex-col justify-between gap-4"
            >
              <p className="service-card-title font-bold text-xl">
                {serviceItem.category}
              </p>

              <div className="text-sm text-gray-700">
                {serviceItem.description}
              </div>

              <button
                className="service-card-button cursor-pointer bg-gray-800 text-white rounded-md p-2 w-fit"
                onClick={() =>
                  handleBookingClick(serviceItem._id, serviceItem.price)
                }
              >
                Add Booking
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No services found.</p>
      )}
    </div>
  );
};

export default UserDashboard;
