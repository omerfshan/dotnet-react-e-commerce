import axios, { AxiosError, type AxiosResponse } from "axios";
import { router } from "../Router/Routes";
import { toast } from "react-toastify";
import { BASE_URL } from "./config";

axios.defaults.baseURL = `${BASE_URL}/api/`;
axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
  const user = localStorage.getItem("user");
  if (user) {
    try {
      const token = JSON.parse(user).token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.error("Token parse error", e);
    }
  }
  return config;
});

axios.interceptors.response.use(  
   (response) => {
    console.log("✅ API SUCCESS:", response.config.url, response.data);
    return response;
  },
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
      toast.error((data as any)?.title || (data as any)?.message || "Bad Request");
      return Promise.reject(res);
    }

    // ✅ DİĞERLERİ ROUTE
    switch (status) {
      case 401:
        localStorage.removeItem("user");
        router.navigate("/unauthorized", { state: { error: data, status } });
        break;

      case 404:
        router.navigate("/not-found", { state: { error: data, status } });
        break;

      case 500:
      case 505:
        router.navigate("/server-error", { state: { error: data, status } });
        break;

      default:
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
  Category_details: (id: number) => queries.get(`Products?categoryId=${id}`), // ✅ düzelt
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
const Auth = {
  login: (data: { email: string; password: string }) =>
    queries.post("Auth/login", data),
  register: (data: { email: string; password: string; firstName: string; lastName: string }) =>
    queries.post("Auth/register", data),
  logout: () => queries.post("Auth/logout", {}),
};

const Account = {
  getProfile: () => queries.get("Auth/profile"),
  updateProfile: (data: {
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    addressTitle?: string;
    fullAddress?: string;
    city?: string;
  }) => queries.put("Auth/profile", data),
  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    queries.post("Auth/change-password", data),
};

const Favorites = {
  getFavorites: () => queries.get("Favorites"),
  addFavorite: (productId: number) => queries.post(`Favorites/${productId}`, {}),
  removeFavorite: (productId: number) => queries.delete(`Favorites/${productId}`),
};

const Orders = {
  getOrders: () => queries.get("Orders"),
  getOrderById: (id: number) => queries.get(`Orders/${id}`),
  createOrder: (data: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    addressTitle: string;
    city: string;
    fullAddress: string;
    shippingOption: string;
  }) => queries.post("Orders", data),
};

const requests = {
  Catalog,
  Errors,
  Cart,
  Auth,
  Account,
  Favorites,
  Orders,
};

export default requests;
