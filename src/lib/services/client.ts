import axios from "axios";

import type {
  RequestConfig,
  ResponseConfig,
  ResponseErrorConfig,
} from "@kubb/plugin-client/clients/axios";
import { retriveAccessToken } from "../auth";

export { RequestConfig, ResponseConfig, ResponseErrorConfig };

const api = axios.create({ baseURL: process.env.API_URL });

api.interceptors.request.use(async (config) => {
  const token = await retriveAccessToken()

  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});

const client = async <T, U, V>(config: RequestConfig<V>) => {
  const c = { ...config, headers: { ...config.headers } };

  return api.request(c) as Promise<ResponseConfig<T>>;
};

export default client;
