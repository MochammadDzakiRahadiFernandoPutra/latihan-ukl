"use client";

import { storeCookie } from "@/lib/client-cookie";
import { BASE_API_URL } from "@/lib/global";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const url = `${BASE_API_URL}/user/login`;
      const { data } = await axios.post(url, { email, password });

      if (data.status) {
        toast.success("Login berhasil!");
        storeCookie("token", data.token);
        storeCookie("id", data.data.id);
        storeCookie("name", data.data.name);
        setTimeout(() => router.replace("/dashboard"), 1000);
      } else {
        toast.warning(data.message || "Login gagal!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan server!");
    }
  };

  return (
    <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
      <ToastContainer />
      <h2 className="text-center text-2xl font-bold text-blue-600 mb-6">Presensi Online</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-black">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            className="w-full border rounded-md p-2 mt-1 focus:ring focus:ring-blue-200 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-black">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            className="w-full border rounded-md p-2 mt-1 focus:ring focus:ring-blue-200 text-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
