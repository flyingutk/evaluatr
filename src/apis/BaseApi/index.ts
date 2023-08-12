import axios, { AxiosInstance, AxiosError, AxiosResponse, AxiosHeaders } from "axios";
import { retrieveData, STORAGE_CONSTANT } from "../../helpers/storageHelpers";
import Config from "react-native-config";
export declare type Headers = {
  [key: string]: string;
};
type Config = {
  header: Headers;
  baseURL: string;
};
export interface ResponseBody<T> {
  status: number;
  data: T;
}

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

abstract class BaseAPi {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: Config.BASE_URL,
      headers: headers,
    });
    this.api.interceptors.request.use(this.processRequest);
    // this.api.interceptors.response.use(this.processResponse);
  }

  private async processRequest(config: any) {
    const token: string | null | undefined = await retrieveData(STORAGE_CONSTANT.USER_TOKEN);
    const language: string | null | undefined = await retrieveData(STORAGE_CONSTANT.CURRENT_PRE_LAN);
    language && (config.headers["Accept-Language"] = language);
    if (token) {
      config.headers["Authorization"] = "Token " + token;
    }
    return config;
  }

  private _prepareHeaders(initialHeaders?: Headers): Headers {
    return {
      ...headers,
      ...initialHeaders,
    };
  }

  protected async get(endpoint: string, data?: { params?: unknown; initialHeaders?: Headers }) {
    try {
      const { params, initialHeaders } = data ?? {};
      const config = { params, headers: this._prepareHeaders(initialHeaders) };
      const resp = await this.api.get(endpoint, config);

      return this.handleResponse(resp);
    } catch (e) {
      return this.handleError(e);
    }
  }
  protected async post<T>(
    endpoint: string,
    data?: { params?: unknown; initialHeaders?: Headers },
  ): Promise<ResponseBody<T>> {
    try {
      const { params, initialHeaders } = data ?? {};
      const config = { headers: this._prepareHeaders(initialHeaders) };

      console.log("%c @@@REQUEST::::: ", "color:white; background:#AF7D3D;", endpoint);
      const resp = await this.api.post(endpoint, params, config);

      return this.handleResponse(resp);
    } catch (e) {
      return this.handleError(e);
    }
  }
  protected async put(endpoint: string, data?: { params?: unknown; initialHeaders?: Headers }) {
    try {
      const { params, initialHeaders } = data ?? {};
      const config = { headers: this._prepareHeaders(initialHeaders) };

      const resp = await this.api.put(endpoint, params, config);
      return this.handleResponse(resp);
    } catch (e) {
      return this.handleError(e);
    }
  }
  protected async delete(endpoint: string, data?: { params?: unknown; initialHeaders?: Headers }) {
    try {
      const { params, initialHeaders } = data ?? {};
      const config = { params, headers: this._prepareHeaders(initialHeaders) };

      const resp = await this.api.delete(endpoint, config);
      return this.handleResponse(resp);
    } catch (e) {
      return this.handleError(e);
    }
  }

  private handleResponse(response: AxiosResponse) {
    console.log("%cRESPONSE:::::111 ", "color:white; background:#0A906E;", response?.config?.url);
    if (response?.config?.url?.includes("https://maps.googleapis.com/maps/api/geocode/json")) {
      return response?.data?.results;
    } else {
      return response?.data?.result;
    }
  }

  private handleError(err: AxiosError) {
    console.log("error:", err.config);
    console.log("%c @@@ERROR,::::: ", "color:white; background:#F42113;", err);
    throw err;
  }

  protected getStatusCode(res: AxiosError | AxiosResponse): number {
    const failRes = res as AxiosError;
    if (failRes?.response?.status) {
      return failRes?.response?.status;
    } else if (failRes?.request?.status) {
      return failRes?.request?.status;
    } else {
      res = res as AxiosResponse;
    }
    return res?.status;
  }
}
export default BaseAPi;
