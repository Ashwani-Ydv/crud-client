import React, { useState } from "react";
import axios from "axios";

function CreateUser({ addUser }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Checking for empty values
    let formErrors = {};
    for (let key in formData) {
      if (formData[key].trim() === "") {
        formErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required.`;
      }
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    addUser(formData);
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prevState) => ({
        ...prevState,
        [name]: undefined,
      }));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Create User</h2>
      <div className="space-y-4">
        <div className="mb-4">
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className={`p-2 border rounded w-full ${
              errors.firstName ? "border-red-500" : ""
            }`}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="p-2 border rounded w-full"
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            name="phone"
            type="tel"
            maxLength="12"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            value={formData.phone}
            onChange={handleChange}
            placeholder="888 888 8888"
            className={`p-2 border rounded w-full ${
              errors.phone ? "border-red-500" : ""
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-2 border rounded w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Create
        </button>
      </div>
    </div>
  );
}

export default CreateUser;
