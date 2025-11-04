"use client";

import { get } from "@/lib/api-bridge";
import { getCookie, storeCookie } from "@/lib/client-cookie";
import { BASE_API_URL } from "@/lib/global";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const token = getCookie("token") || "";
  const id = getCookie("id") || "";

  // 🔹 Ambil data user dari backend
  const fetchUser = async () => {
    try {
      const { data } = await get(`/user/${id}`, token);
      if (data.status) {
        setUser(data.data);
      } else {
        toast.warning("Gagal memuat data profil");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // 🔹 Update profil
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const url = `${BASE_API_URL}/user/${id}`;
      const payload = {
        name: user?.name,
        email: user?.email,
        password: newPassword || undefined,
      };

      const { data } = await axios.put(url, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.status) {
        toast.success("Profil berhasil diperbarui");
        storeCookie("name", data.data.name);
      } else {
        toast.warning(data.message || "Update gagal");
      }
    } catch (error) {
      toast.error("Gagal mengubah data");
      console.error(error);
    }
  };

  if (!user) return <div className="p-6">Wait...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <ToastContainer />
      <div className="bg-gray-50 p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Profil Pengguna
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nama
            </label>
            <input
              type="text"
              className="w-full border rounded-md p-2 mt-1 focus:ring focus:ring-blue-200"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full border rounded-md p-2 mt-1 focus:ring focus:ring-blue-200"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password Baru (opsional)
            </label>
            <input
              type="password"
              placeholder="Kosongkan jika tidak ingin ubah"
              className="w-full border rounded-md p-2 mt-1 focus:ring focus:ring-blue-200"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
          >
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
