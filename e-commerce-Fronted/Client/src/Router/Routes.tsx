import { createBrowserRouter } from "react-router-dom";
import App from "../Companents/App";
import AboutPage from "../page/AboutPage";
import ContactPage from "../page/ContactPage";
import CatalogPage from "../page/CatalogPage";
import ProductAbout from "../page/ProductAboutCompanent/ProductAbout";
import NotFound from "../page/ErrorPages/NotFound";
import BadRequest from "../page/ErrorPages/BadRequest";
import Unauthorized from "../page/ErrorPages/Unauthorized";
import ValidationError from "../page/ErrorPages/ValidationError";
import ServerError from "../page/ErrorPages/ServerError"
import HomePage from "../page/HomePage";
import Example from "../example";

import CartPage from "../page/Cart/CartPage";


// ✅ Error Pages (oluşturduğun dosya path'lerine göre importları düzelt)


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // home
      { index: true, element: <HomePage /> },

      // pages
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },

      // catalog
      { path: "catalog", element: <CatalogPage /> },      // tüm ürünler
      { path: "category/:id", element: <CatalogPage /> }, // kategoriye göre

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
