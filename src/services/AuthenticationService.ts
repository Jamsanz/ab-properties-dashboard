import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { AB_PROPERTIES_USER } from "../utils/constants";
import HttpService from "./HttpService";

class Authentication {
  private static httpService: HttpService = new HttpService();
  static async authenthicate(
    email: string,
    password: any
  ): Promise<AxiosResponse | AxiosError> {
    try {
      this.httpService.setBaseUrl(process.env.URL!);
      const response = await (
        this.httpService.httpClient() as AxiosInstance
      ).post(email, password);
      return response as AxiosResponse;
    } catch (error) {
      return error as AxiosError;
    }
  }
  static getUserSession() {
    const user = window.localStorage.getItem(AB_PROPERTIES_USER);
    if (user) return JSON.parse(user);
    return null;
  }
}

export default Authentication;
