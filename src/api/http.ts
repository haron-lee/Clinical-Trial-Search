import axios, { AxiosInstance } from 'axios';

export default class Http {
  private axiosInstance: AxiosInstance;
  private BASE_URL: string;

  constructor(BASE_URL: string) {
    this.BASE_URL = BASE_URL;
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
    });
  }

  public async get<T>(endPoint: string, params: object): Promise<T> {
    try {
      const response = await this.axiosInstance.get<T>(endPoint, params);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}
