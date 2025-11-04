import { BASE_API_URL } from "@/lib/global";
import axios from "axios";


const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000, 
});


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
