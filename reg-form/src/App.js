import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: null,
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the error message when the user starts typing
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
    setErrors({
      ...errors,
      image: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    let formErrors = {};

    if (!formData.name.trim()) {
      formErrors.name = 'Name is required';
    } else if (formData.name.includes(' ')) {
      formErrors.name = 'Name should not contain spaces';
    }

    if (!formData.email.trim()) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email should be in email format';
    }

    if (!formData.password.trim()) {
      formErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      formErrors.password = 'Password should be at least 8 characters';
    } else if (formData.password.length > 12) {
      formErrors.password = 'Password should not exceed 12 characters';
    }

    if (formData.confirmPassword !== formData.password) {
      formErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.image) {
      formErrors.image = 'Image is required';
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      // Form is error-free, log the data (you can replace this with your desired action)
      console.log('Form Data:', formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Name:</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <div className="text-danger">{errors.name}</div>
      </div>

      <div className="mb-3">
        <label className="form-label">Email:</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <div className="text-danger">{errors.email}</div>
      </div>

      <div className="mb-3">
        <label className="form-label">Password:</label>
        <input
          type="password"
          className="form-control"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <div className="text-danger">{errors.password}</div>
      </div>

      <div className="mb-3">
        <label className="form-label">Confirm Password:</label>
        <input
          type="password"
          className="form-control"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <div className="text-danger">{errors.confirmPassword}</div>
      </div>

      <div className="mb-3">
        <label className="form-label">Upload Image:</label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          name="image"
          onChange={handleImageChange}
        />
        <div className="text-danger">{errors.image}</div>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
