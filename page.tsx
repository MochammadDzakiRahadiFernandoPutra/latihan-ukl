"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

const DashboardPage = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [attendance, setAttendance] = useState([
    { date: "2025-11-01", status: "Hadir" },
    { date: "2025-11-02", status: "Hadir" },
    { date: "2025-11-03", status: "Alpha" },
  ]);

  // 📊 Data untuk grafik presensi
  const data = [
    { day: "Sen", hadir: 5 },
    { day: "Sel", hadir: 0 },
    { day: "Rab", hadir: 12 },
    { day: "Kam", hadir: 9 },
    { day: "Jum", hadir: 5 },
  ];

  const handleCheckIn = () => {
    if (!isCheckedIn) {
      setIsCheckedIn(true);
      toast.success("Check-in berhasil!");
    } else {
      setIsCheckedIn(false);
      toast.info("Check-out berhasil!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Leaderboard Presensi</h1>
      

      {/* Tombol Check-in */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6 flex items-center justify-between">
        <span className="text-lg p-2 text-black text-center font-semibold">
          Status: {isCheckedIn ? "Sudah Check-in" : "Belum Check-in"}
        </span>
        <button
          onClick={handleCheckIn}
          className={`px-4 py-2 rounded-md text-white ${
            isCheckedIn ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isCheckedIn ? "Check-out" : "Check-in"}
        </button>
      </div>

      {/* Daftar Presensi */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold text-black p-2 mb-2">Riwayat Presensi</h2>
        <table className="w-full border text-black">
          <thead className="bg-red-800 text-white">
            <tr>
              <th className="p-2 text-left">Tanggal</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">{item.date}</td>
                <td className="p-2">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📊 Grafik Presensi Mingguan */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-black">Grafik Presensi Mingguan</h2>
        <div className="overflow-x-auto flex justify-center">
          <BarChart width={500} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="hadir" fill="#3b82f6" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
