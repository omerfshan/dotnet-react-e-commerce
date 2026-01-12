import axios, { AxiosError, type AxiosResponse } from "axios";
import { router } from "../Router/Routes";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:5232/api/";
axios.defaults.withCredentials=true;
axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const res = error.response as AxiosResponse | undefined;

    if (!res) {
      router.navigate("/server-error", {
        state: {
          status: 0,
          error: { title: "Sunucuya bağlanılamadı", detail: error.message },
        },
      });
      return Promise.reject(error);
    }

    const { data, status } = res;

    // ✅ 422 → SAYFAYA GİTME, TOAST YOK, ARRAY FIRLAT
    if (status === 422 && (data as any)?.errors) {
      const errors = (data as any).errors as Record<string, string[]>;
      const validationErrors: string[] = [];

      for (const key in errors) {
        if (errors[key]?.length) validationErrors.push(...errors[key]);
      }

      return Promise.reject(validationErrors);
    }

    // ✅ 400 → SADECE TOAST
    if (status === 400) {
      toast.error((data as any)?.title || "Bad Request");
      return Promise.reject(res);
    }

    // ✅ DİĞERLERİ ROUTE
    switch (status) {
      case 401:
        router.navigate("/unauthorized", { state: { error: data, status } });
        break;

      case 404:
        router.navigate("/not-found", { state: { error: data, status } });
        break;

      case 500:
        router.navigate("/server-error", { state: { error: data, status } });
        break;

      default:
        // diğer statuslar için hiçbir şey yapma (redirect istemiyorsun)
        break;
    }

    return Promise.reject(res);
  }
);

const queries = {
  get: (url: string) =>
    axios.get(url).then((response: AxiosResponse) => response.data),

  post: (url: string, body: {}) =>
    axios.post(url, body).then((response: AxiosResponse) => response.data),

  put: (url: string, body: {}) =>
    axios.put(url, body).then((response: AxiosResponse) => response.data),

  delete: (url: string) =>
    axios.delete(url).then((response: AxiosResponse) => response.data),
};

const Catalog = {
  list: () => queries.get("Products"),
  product_Details: (id: number) => queries.get(`Products/${id}`),
  Category_details: (id: number) => queries.get(`Categories/${id}`),
};

const Errors = {
  getNotFound: () => queries.get("Error/not-found"),
  getBadRequest: () => queries.get("Error/bad-request"),
  getUnauthorized: () => queries.get("Error/unauthorized"),
  getServerError: () => queries.get("Error/server-error"),
  getValidationError: () => queries.get("Error/validation-error"),
};
const Cart={
 
  addItem: (productId: number, quantity: number = 1) =>queries.post(`Cart?productId=${productId}&quantity=${quantity}`, {}),
   deleteItem: (productId: number, quantity: number = 1) =>queries.delete(`Cart?productId=${productId}&quantity=${quantity}`),
   getCart:()=> queries.get('Cart'),
}


const requests = {
  Catalog,
  Errors,
  Cart
};

export default requests;
