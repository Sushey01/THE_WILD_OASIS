import React, { useState } from "react";
import "./UserForm.css"

export function UserForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    repeatPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setFormData({
      fullName: "",
      email: "",
      password: "",
      repeatPassword: ""
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password || !formData.repeatPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    if (formData.password !== formData.repeatPassword) {
      alert("Passwords do not match");
      return;
    }
    // setSuccessMessage("User created successfully")
    console.log("User created successfully", formData);
  };

  return (
    <div className="container">
      <h2 className="userHeading">Create a new user</h2>
      <form className="userForm" onSubmit={handleSubmit}>
        <div className="userInput">
          <label>Full name</label>
          <input
            type="text"
            name="fullName"
            placeholder=""
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="userInput">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            placeholder=""
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="userInput">
          <label>Password (min 8 characters)</label>
          <input
            type="password"
            name="password"
            placeholder=""
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="userInput">
          <label>Repeat password</label>
          <input
            type="password"
            name="repeatPassword"
            placeholder=""
            value={formData.repeatPassword}
            onChange={handleChange}
          />
        </div>

        <div className="userButtons">
          <button className="btn-cancel" type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn-create" type="submit">
            Create a new User
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
