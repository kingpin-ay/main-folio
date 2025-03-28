import axios, { AxiosResponse } from "axios";

type GetResponseType<T> = {
  data: T;
  status: number;
  message: string;
};

class AppClient {
  private baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
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
    const response = await axios.get(`${this.baseUrl}/health-check`);

    return this.responseObjectBuilder(response);
  }

  async login(formData: FormData): Promise<GetResponseType<string>> {
    const response = await axios.post(`${this.baseUrl}/users/login`, formData);

    return this.responseObjectBuilder(response);
  }
}

export const appClient = new AppClient(process.env.NEXT_PUBLIC_BASE_URL ?? ``);
