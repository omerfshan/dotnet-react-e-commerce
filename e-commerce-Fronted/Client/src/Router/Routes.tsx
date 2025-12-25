import { createBrowserRouter } from "react-router-dom";
import App from "../Companents/App";
import HomePage from "../page/HomePage";
import AboutPage from "../page/AboutPage";
import ContactPage from "../page/ContactPage";
import CatalogPage from "../page/CatalogPage";
import ProductAbout from "../page/ProductAboutCompanent/ProductAbout";
import Example from "../example";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Example /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },

      { path: "catalog", element: <CatalogPage /> },          // tüm ürünler
      { path: "category/:id", element: <CatalogPage /> },      // kategoriye göre

      { path: "catalog/:id", element: <ProductAbout /> },      // ürün detayı
    ],
  },
]);

