import axios, { AxiosInstance } from "axios";
import { DATA_COLLECT_TOKEN, DATA_COLLECT_USER } from "../utils/constants";

class HttpService{
  private baseUrl: string;
  private http: AxiosInstance;

  constructor(baseUrl = process.env.URL!) {
    this.baseUrl = baseUrl;
    this.http = axios.create({ baseURL: this.baseUrl });
  }

  public setBaseUrl(baseUrl: string): void {
    this.baseUrl = baseUrl;
    this.http.defaults.baseURL = this.baseUrl;
  }

  public httpClient(): AxiosInstance {
    const headers: {[key: string]: any} = {};

    if (this.baseUrl === process.env.REACT_APP_NJFP_ELEARNING_SERVER_URL) {
      headers['Authorization'] = window.localStorage.getItem(DATA_COLLECT_TOKEN) ?
        `${window.localStorage.getItem(DATA_COLLECT_TOKEN)}` :
        '';
    }

    const user = window.localStorage.getItem(DATA_COLLECT_USER);
    if (user) {
      headers[DATA_COLLECT_USER] = (JSON.parse(user)).email;
    }
    
    // this.http.defaults.headers = headers;
    return this.http;
  }
}

export default HttpService;