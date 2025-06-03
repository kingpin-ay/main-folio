import axios, { AxiosResponse } from "axios";
import { ContactDetails, UserAbout, UserDashboard } from "../types";
import { UserProfile } from "@/components/tabs/profile-tab";

type GetResponseType<T> = {
  data: T | null;
  status: number;
  message: string;
};

class AppClient {
  private baseUrl: string;
  private axiosInstance;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.axiosInstance = axios.create({
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
    });

    this.axiosInstance.interceptors.request.use(
      (config) => config,
      (error) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error)
    );
  }

  responseObjectBuilder<T>(data: AxiosResponse<T>): GetResponseType<T> {
    const result: GetResponseType<T> = {
      data: {} as T,
      status: 0,
      message: "",
    };
    result.status = data.status;
    result.message = data.statusText;

    if (data.status !== 200) {
      return result;
    }

    result.data = data.data;
    return result;
  }

  async login(formData: FormData): Promise<GetResponseType<string>> {
    try {
      const response = await this.axiosInstance.post(
        `${this.baseUrl}/auth/login`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      return this.responseObjectBuilder(response);
    } catch (error) {
      throw error;
    }
  }

  async verify(): Promise<GetResponseType<string>> {
    try {
      const response = await this.axiosInstance.post(
        `${this.baseUrl}/users/verify`,
        {},
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      return this.responseObjectBuilder(response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          data: null,
          status: error.response?.status ?? 500,
          message:
            error.response?.statusText ??
            "An error occurred while verifying the user.",
        };
      }
      return {
        data: null,
        status: 500,
        message: "An unexpected error occurred while verifying the user.",
      };
    }
  }

  async logout() {
    try {
      const response = await this.axiosInstance.get(
        `${this.baseUrl}/auth/logout`,
        {
          withCredentials: true,
        }
      );
      return this.responseObjectBuilder(response);
    } catch (error) {
      throw error;
    }
  }

  async getUserDashboard(): Promise<
    GetResponseType<UserDashboard | undefined>
  > {
    try {
      const response = await this.axiosInstance.get(
        `${this.baseUrl}/users/get/user/dashboard`,
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.data) {
        return {
          data: null,
          status: response.status,
          message: response.statusText,
        };
      }
      return this.responseObjectBuilder(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          data: null,
          status: error.response?.status ?? 500,
          message: error.response?.statusText ?? "An error occurred",
        };
      }
      return {
        data: null,
        status: 500,
        message: "An unexpected error occurred",
      };
    }
  }

  async changeUserDashboardProfile(
    profile: UserProfile
  ): Promise<{ message: string; status: number; data: any }> {
    try {
      const response = await this.axiosInstance.post(
        `${this.baseUrl}/users/post/user/dashboard/profile`,
        profile,
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      return this.responseObjectBuilder(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          data: null,
          status: error.response?.status ?? 500,
          message: error.response?.statusText ?? "An error occurred",
        };
      }
      return {
        data: null,
        status: 500,
        message: "An unexpected error occurred",
      };
    }
  }

  async updateUserAbout(
    about: UserAbout
  ): Promise<{ message: string; status: number; data: any }> {
    try {
      const response = await this.axiosInstance.post(
        `${this.baseUrl}/users/post/user/dashboard/about`,
        about,
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      return this.responseObjectBuilder(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          data: null,
          status: error.response?.status ?? 500,
          message: error.response?.statusText ?? "An error occurred",
        };
      }
      return {
        data: null,
        status: 500,
        message: "An unexpected error occurred",
      };
    }
  }

  async updateUserContacts(
    contacts: ContactDetails[]
  ): Promise<{ message: string; status: number; data: any }> {
    try {
      const response = await this.axiosInstance.post(
        `${this.baseUrl}/users/post/user/dashboard/contacts`,
        { contacts: contacts },
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      return this.responseObjectBuilder(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          data: null,
          status: error.response?.status ?? 500,
          message: error.response?.statusText ?? "An error occurred",
        };
      }
      return {
        data: null,
        status: 500,
        message: "An unexpected error occurred",
      };
    }
  }
}
export const appClient = new AppClient(process.env.NEXT_PUBLIC_BASE_URL ?? "");
