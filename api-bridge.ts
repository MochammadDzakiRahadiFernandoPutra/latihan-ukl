import { BASE_API_URL } from "@/lib/global";
import axios from "axios";

/**
 * axiosInstance → untuk koneksi dasar ke backend
 */
const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000, // maksimal waktu tunggu 10 detik
});

/**
 * GET → ambil data dari API
 */
export const get = async (url: string, token: string) => {
  try {
    const { data } = await axiosInstance.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { status: true, data };
  } catch (error: any) {
    console.error("GET error:", error.response?.data || error.message);
    return { status: false, data: null };
  }
};

/**
 * POST → kirim data ke API
 */
export const post = async (url: string, body: any, token: string) => {
  try {
    const { data } = await axiosInstance.post(url, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { status: true, data };
  } catch (error: any) {
    console.error("POST error:", error.response?.data || error.message);
    return { status: false, data: null };
  }
};

/**
 * PUT → update data di API
 */
export const put = async (url: string, body: any, token: string) => {
  try {
    const { data } = await axiosInstance.put(url, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { status: true, data };
  } catch (error: any) {
    console.error("PUT error:", error.response?.data || error.message);
    return { status: false, data: null };
  }
};

/**
 * DELETE → hapus data di API
 */
export const remove = async (url: string, token: string) => {
  try {
    const { data } = await axiosInstance.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { status: true, data };
  } catch (error: any) {
    console.error("DELETE error:", error.response?.data || error.message);
    return { status: false, data: null };
  }
};
