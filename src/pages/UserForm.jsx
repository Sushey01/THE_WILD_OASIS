/* src/components/UserForm.jsx */
import React, { useState } from "react";
import { useSignup } from "../services/useSignup";
import "./UserForm.css";

export default function UserForm() {
  const { signup, isLoading } = useSignup();          // ← custom React-Query hook

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  /* ───── helpers ───── */
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCancel = () => {
    setFormData({ fullName: "", email: "", password: "", repeatPassword: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    /* basic client-side validation */
    if (Object.values(formData).some((v) => v.trim() === "")) {
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

    /* call Supabase sign-up mutation */
    signup(
      {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      },
      {
        onSuccess: () =>
          setFormData({
            fullName: "",
            email: "",
            password: "",
            repeatPassword: "",
          }),
      }
    );
  };

  /* ───── JSX ───── */
  return (
    <div className="container">
      <h2 className="userHeading">Create a new user</h2>

      <form className="userForm" onSubmit={handleSubmit} noValidate>
        {/* full name */}
        <div className="userInput">
          <label>Full name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        {/* email */}
        <div className="userInput">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* password */}
        <div className="userInput">
          <label>Password (min&nbsp;8&nbsp;characters)</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* repeat password */}
        <div className="userInput">
          <label>Repeat password</label>
          <input
            type="password"
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleChange}
            required
          />
        </div>

        {/* buttons */}
        <div className="userButtons">
          <button
            className="btn-cancel"
            type="button"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </button>

          <button className="btn-create" type="submit" disabled={isLoading}>
            {isLoading ? "Creating…" : "Create a new User"}
          </button>
        </div>
      </form>
    </div>
  );
}
