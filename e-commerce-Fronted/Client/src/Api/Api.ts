import axios, { AxiosError, type AxiosResponse } from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL="http://localhost:5232/api/"
axios.interceptors.response.use(response=>{
  return response;
},(error:AxiosError)=>{
  console.log(error.response)
  const {data,status}=error.response as AxiosResponse;
  switch (status) {
  case 400:
    toast.error(data.title);
    break;

  case 401:
    toast.error(data.title);
    break;

  case 404:
    toast.error(data.title);
    break;

  case 500:
    toast.error(data.title);
    break;
  default:
  toast.error(data.title);
  break;

}

 return Promise.reject(error.response) 
})
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
  product_Details:(id:number)=>queries.get(`Products/${id}`),
  Category_details: (id: number) => queries.get(`Categories/${id}`)
};
const Errors = {
  getNotFound: () => queries.get("/error/not-found"),
  getBadRequest: () => queries.get("/error/bad-request"),
  getUnauthorized: () => queries.get("/error/unauthorized"),
  getServerError: () => queries.get("/error/server-error"),
  getValidationError: () => queries.get("/error/validation-error"),
};



// ❗️TEK DÜZELTME BURASI
const requests = {
  Catalog,
  Errors
};

export default requests;