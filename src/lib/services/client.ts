import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import {
  clearAuthTokens,
  retriveAccessToken,
  retriveRefreshToken,
  setAccessToken,
  setAuthTokens,
  setRefreshToken,
} from "../auth";
import type { RequestConfig } from "@kubb/plugin-client/clients/axios";
import type { ResponseConfig } from "@kubb/plugin-client/clients/axios";
import type { ResponseErrorConfig } from "@kubb/plugin-client/clients/axios";
import {
  getRefreshSessionUrl,
  LoginResponse,
  RefreshSessionMutationResponse,
  type Error,
} from "./gen";
import { redirect } from "next/navigation";

export type { RequestConfig, ResponseConfig, ResponseErrorConfig };

type ErrorHandler<T = unknown> = (
  r: AxiosResponse<Error>,
  c: RequestConfig
) => Promise<ResponseConfig<T>>;

export const api = axios.create({ baseURL: process.env.API_URL });

class ApiWrapper {
  static refreshing = false;
  static queue: (() => void)[] = [];
  static retries = 0;

  constructor(private readonly api: AxiosInstance) {
    this.api.interceptors.request.use(async (config) => {
      const token = await retriveAccessToken();

      if (token) {
        config.headers.Authorization = "Bearer " + token;
      }

      return config;
    });
  }

  private errors: Partial<Record<number, ErrorHandler>> = {
    401: async ({ data }, config) => {
      console.log("lidando com erro 401");

      if (data.message === "Token expired") {
        console.log("token expirado", ApiWrapper.refreshing);

        if (!ApiWrapper.refreshing) {
          ApiWrapper.refreshing = true;

          const url = getRefreshSessionUrl();
          const token = await retriveRefreshToken();

          const session: LoginResponse | null = await this.api
            .post<RefreshSessionMutationResponse>(url, { refresh_token: token })
            .then(async ({ data }) => setAuthTokens(data).then(() => data))
            .catch(() => clearAuthTokens().then(() => null));

          console.log("session", session);
          if (!session) {
            console.log("não foi possivel renovar o token");
            if (localStorage) localStorage.removeItem("session");
            console.log("localStorage removido", localStorage);

            console.log("redirecionando para login");

            redirect("/sign-in");
          }

          for (const cb of ApiWrapper.queue) {
            console.log("indo avisar quem está esperando");
            cb();
          }

          console.log("finalizando");
          ApiWrapper.refreshing = false;
          ApiWrapper.queue = [];
        }

        return this.api.request(config);
      }

      throw new Error("Unauthorized");
    },
  };

  request = async <T, V>(c: RequestConfig<V>): Promise<ResponseConfig<T>> => {
    const config: RequestConfig = { ...c, headers: { ...c.headers } };

    if (ApiWrapper.refreshing) {
      console.log("indo esperar");
      await new Promise<void>((res) => ApiWrapper.queue.push(() => res()));
      console.log("esperado");
    }

    return this.api.request(config).catch(async (error: AxiosError<Error>) => {
      const original = error.config as typeof config;
      const response = error.response;

      if (!original) throw error;
      if (!response) throw error;

      const handler = this.errors[response.status];

      if (handler) {
        ApiWrapper.retries = 0;
        return (await handler(response, original)) as ResponseConfig<T>;
        // while (ApiWrapper.retries < 3) {
        //   console.log("tentando novamente", ApiWrapper.retries);

        //   try {

        //   } catch {
        //     ApiWrapper.retries++;
        //   }
        // }
      }

      throw error;
    });
  };
}

let wrapper: ApiWrapper;
export default async function client<T, _, V>(c: RequestConfig<V>) {
  if (!wrapper) {
    wrapper = new ApiWrapper(api);
  }

  return wrapper.request<T, V>(c);
}
