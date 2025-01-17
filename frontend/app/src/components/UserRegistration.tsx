import React, { useState } from 'react';
import { createUser } from './api';

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

interface FormData {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: Address;
}

const UserRegistration: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      address: { ...formData.address, [name]: value },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createUser(formData);
      alert('User registered successfully');
    } catch (error: any) {
      alert('Error: ' + error.response?.data?.error || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>User Registration</h2>
      <input type="text" name="name" placeholder="Name" onChange={handleInputChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
      <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleInputChange} />

      <h3>Address</h3>
      <input type="text" name="street" placeholder="Street" onChange={handleAddressChange} />
      <input type="text" name="city" placeholder="City" onChange={handleAddressChange} />
      <input type="text" name="state" placeholder="State" onChange={handleAddressChange} />
      <input type="text" name="zipCode" placeholder="Zip Code" onChange={handleAddressChange} />

      <button type="submit">Register</button>
    </form>
  );
};

export default UserRegistration;
