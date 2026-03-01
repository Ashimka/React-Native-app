import { axiosPublic } from "@/api/api.interceptors";
import { API_ENDPOINTS } from "@/config/api.config";
import { IAuthForm } from "@/types/auth.interface";
import { AxiosError } from "axios";

export const authServiceLogin = async (authData: IAuthForm) => {
  try {
    const { data } = await axiosPublic({
      url: `${API_ENDPOINTS.AUTH}`,
      method: "POST",
      data: authData,
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
  }
};

export const authServiceVerifyCode = async (email: string, code: string) => {
  try {
    const { data } = await axiosPublic({
      url: `${API_ENDPOINTS.VERIFY_CODE}`,
      method: "POST",
      data: { email, code },
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
  }
};
