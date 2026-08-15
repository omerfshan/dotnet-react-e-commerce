import { createBrowserRouter } from "react-router-dom";
import App from "../Layout/App";

import ProductAbout from "../Features/ProductAboutCompanent/ProductAbout";
import NotFound from "../Features/ErrorPages/NotFound";
import BadRequest from "../Features/ErrorPages/BadRequest";
import Unauthorized from "../Features/ErrorPages/Unauthorized";
import ValidationError from "../Features/ErrorPages/ValidationError";
import ServerError from "../Features/ErrorPages/ServerError";

import Example from "../Example/example";
import CartPage from "../Features/CartBasket/CartPage";
import HomePage from "../Features/Page/HomePage";
import AboutPage from "../Features/Page/AboutPage";
import ContactPage from "../Features/Page/ContactPage";
import CatalogPage from "../Features/Page/CatalogPage";
import LoginPage from "../Features/Account/LoginPage";
import RegisterPage from "../Features/Account/RegisterPage";
import ProfilePage from "../Features/Account/ProfilePage";
import FavoritesPage from "../Features/Page/FavoritesPage";
import CheckoutPage from "../Features/Checkout/CheckoutPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // home
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "favorites", element: <FavoritesPage /> },

      // pages
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },

      // catalog
      { path: "catalog", element: <CatalogPage /> },
      { path: "category/:id", element: <CatalogPage /> },

      // product detail
      { path: "catalog/:id", element: <ProductAbout /> },

      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },

      { path: "errorPage", element: <Example /> },

      // error routes
      { path: "not-found", element: <NotFound /> },
      { path: "bad-request", element: <BadRequest /> },
      { path: "unauthorized", element: <Unauthorized /> },
      { path: "validation-error", element: <ValidationError /> },
      { path: "server-error", element: <ServerError /> },

      // 404 catch-all
      { path: "*", element: <NotFound /> },
    ],
  },
]);
