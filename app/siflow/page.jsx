"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default function SignIn() {
  revalidatePath("/");

  const supabase = createClient();
  const session = supabase.auth.getSession();
  const router = useRouter();

  const [siSuccess, setSiSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        console.error("Sign In error:", error.message);
        // Handle the error (e.g., display an error message)
      } else {
        console.log("Sign IN successful");
        setSiSuccess(true);
        setFormData({
          email: "",
          password: "",
        });
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Unexpected error:", error.message);
      // Handle unexpected errors (e.g., network issues)
    }
  };

  return (
    <div>
      {session ? (
        <div>
          <p>You are already logged in.</p>
          <Link href="/dashboard">Go to Dashboard</Link>
        </div>
      ) : (
        <>
          <h1>Sign In</h1>
          {siSuccess && <p>Logged in</p>}
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
              placeholder="Enter your Password"
              value={formData.password}
              onChange={handleChange}
            />
            <br />
            <button type="submit">Sign In</button>
          </form>
        </>
      )}
    </div>
  );
}
