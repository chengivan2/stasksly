// pages/signup.js
"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const supabase = createClient();

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.first_name,
          },
        },
      });

      if (error) {
        console.error("Sign-up error:", error.message);
        // Handle the error (e.g., display an error message)
      } else {
        console.log("User signed up successfully:", data.user);
        setFormData({
          email: "",
          password: "",
          first_name: "",
        });
        // Redirect to a confirmation page or main app page
      }
    } catch (error) {
      console.error("Unexpected error:", error.message);
      // Handle unexpected errors (e.g., network issues)
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
