import { AppStore } from "@/store/store";
import axios from "axios";

let _store: AppStore | null = null;
const setStore = (store: AppStore) => {
  _store = store;
};

const BASE_URL = "http://localhost:8000";
const httpClient = {
  get: async <T>(url: string) => {
    const userId = _store?.getState().profile.userId;
    const response = await axios.get<T>(`${BASE_URL}${url}`, {
      headers: {
        Authorization: userId ?? "",
      },
    });
    return response.data;
  },
  post: async <T>(url: string, data: object) => {
    const userId = _store?.getState().profile.userId;
    const response = await axios.post<T>(`${BASE_URL}${url}`, data, {
      headers: {
        Authorization: userId ?? "",
      },
    });
    return response.data;
  },
};

export default httpClient;

export { setStore };
