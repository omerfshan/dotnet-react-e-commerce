import { createBrowserRouter } from "react-router-dom";
import App from "../Companents/App";
import HomePage from "../page/HomePage";
import AboutPage from "../page/AboutPage";
import ContactPage from "../page/ContactPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
    ],
  },
]);
