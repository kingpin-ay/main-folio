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
    
    // Log the base URL for debugging
    console.log('API Base URL:', baseUrl);

    this.axiosInstance = axios.create({
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      // Ensure cookies are handled properly
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
    });

    // Add request interceptor for debugging
    this.axiosInstance.interceptors.request.use(
      (config) => {
        console.log('Request Config:', {
          url: config.url,
          method: config.method,
          headers: config.headers,
          withCredentials: config.withCredentials,
          baseURL: config.baseURL
        });
        return config;
      },
      (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor for debugging
    this.axiosInstance.interceptors.response.use(
      (response) => {
        console.log('Response Success:', {
          status: response.status,
          headers: response.headers,
          cookies: document.cookie,
          data: response.data
        });
        return response;
      },
      (error) => {
        console.error('Response Error:', {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers,
          message: error.message,
          cookies: document.cookie
        });
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
    try {
      console.log('Attempting login...');
      const response = await this.axiosInstance.post(
        `${this.baseUrl}/auth/login`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );
      console.log('Login response cookies:', document.cookie);
      return this.responseObjectBuilder(response);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async logout() {
    try {
      console.log('Logging out...');
      const response = await this.axiosInstance.get(
        `${this.baseUrl}/auth/logout`,
        {
          withCredentials: true,
        }
      );
      return this.responseObjectBuilder(response);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  async verify() {
    try {
      console.log('Verifying auth...');
      console.log('Current cookies:', document.cookie);
      const response = await this.axiosInstance.post(
        `${this.baseUrl}/users/verify`,
        {},
        {
          withCredentials: true,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }
      );
      return this.responseObjectBuilder(response);
    } catch (error) {
      console.error('Verify error:', error);
      throw error;
    }
  }
}

// Make sure to use the correct URL from environment variables
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
console.log('Initializing AppClient with base URL:', baseUrl);

export const appClient = new AppClient(baseUrl ?? '');
