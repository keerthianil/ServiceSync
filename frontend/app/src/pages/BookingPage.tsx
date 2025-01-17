import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

interface FormData {
  serviceId: string;
  appointmentDate: string;
  appointmentTime: string;
  notes: string;
}

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    serviceId: "",
    appointmentDate: "",
    appointmentTime: "",
    notes: "",
  });

  const { bookingId } = useParams();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/bookings", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.data.success) {
        navigate(`/payment/${response.data.data._id}`);
      }
    } catch (error) {
      console.error("Error creating booking", error);
    }
  };

  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold">Book a Service</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>
          Service ID:
          <span className=" bg-gray-300">{bookingId}</span>
        </label>
        <label>
          Appointment Date:
          <input
            type="date"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Appointment Time:
          <input
            type="time"
            name="appointmentTime"
            value={formData.appointmentTime}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Notes:
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </label>
        <button
          type="submit"
          className="bg-blue-400 p-2 rounded-sm w-fit"
          onClick={() => {
            alert("Booking Successful");
            navigate("/");
          }}
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
