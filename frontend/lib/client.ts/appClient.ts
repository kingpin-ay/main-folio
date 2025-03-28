import axios, { AxiosResponse } from "axios";

type GetResponseType<T> = {
  data: T;
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
    });

    // Add request interceptor for debugging
    this.axiosInstance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor for debugging
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
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

  async checkHealth(): Promise<GetResponseType<string>> {
    const response = await this.axiosInstance.get(
      `${this.baseUrl}/health-check`
    );
    return this.responseObjectBuilder(response);
  }

  async login(formData: FormData): Promise<GetResponseType<string>> {
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
  }

  async logout() {
    const response = await this.axiosInstance.get(
      `${this.baseUrl}/auth/logout`,
      {
        withCredentials: true,
      }
    );
    return this.responseObjectBuilder(response);
  }

  async verify() {
    const response = await this.axiosInstance.post(
      `${this.baseUrl}/users/verify`,
      {},
      {
        withCredentials: true,
      }
    );
    return this.responseObjectBuilder(response);
  }
}

// For local development, use http://localhost:3000 or your local backend URL
export const appClient = new AppClient(
  process.env.NEXT_PUBLIC_BASE_URL ?? `http://localhost:3000`
);
