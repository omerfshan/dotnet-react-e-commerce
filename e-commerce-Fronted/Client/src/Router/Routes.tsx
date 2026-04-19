import { createBrowserRouter } from "react-router-dom";
import App from "../Layout/App";

import ProductAbout from "../Features/ProductAboutCompanent/ProductAbout";
import NotFound from "../Features/ErrorPages/NotFound";
import BadRequest from "../Features/ErrorPages/BadRequest";
import Unauthorized from "../Features/ErrorPages/Unauthorized";
import ValidationError from "../Features/ErrorPages/ValidationError";
import ServerError from "../Features/ErrorPages/ServerError"

import Example from "../Example/example";
import CartPage from "../Features/CartBasket/CartPage";
import HomePage from "../Features/Page/HomePage";
import AboutPage from "../Features/Page/AboutPage";
import ContactPage from "../Features/Page/ContactPage";
import CatalogPage from "../Features/Page/CatalogPage";
import LoginPage from "../Features/Account/LoginPage";





// ✅ Error Pages (oluşturduğun dosya path'lerine göre importları düzelt)


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // home
      { index: true, element: <HomePage /> },
       { path: "login", element: <LoginPage /> }, 
      // pages
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },

      // catalog
      { path: "catalog", element: <CatalogPage /> },      
      { path: "category/:id", element: <CatalogPage /> },

      // product detail
      { path: "catalog/:id", element: <ProductAbout /> },
      
      {path:"cart",element:<CartPage/>},

      {path:"errorPage",element:<Example/>},
      // ✅ error routes (interceptor bunlara navigate edecek)
      { path: "not-found", element: <NotFound /> },
      { path: "bad-request", element: <BadRequest /> },
      { path: "unauthorized", element: <Unauthorized /> },
      { path: "validation-error", element: <ValidationError /> },
      { path: "server-error", element: <ServerError /> },

      // ✅ her şeyi yakala (404)
      { path: "*", element: <NotFound /> },
    ],
  },
]);
