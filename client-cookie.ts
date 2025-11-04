import Cookies from "js-cookie";

export const getCookie = (key: string) => {
  return Cookies.get(key);
};

export const storeCookie = (key: string, value: string) => {
  Cookies.set(key, value, { expires: 1 }); // berlaku 1 hari
};

export const removeCookie = (key: string) => {
  Cookies.remove(key);
};
