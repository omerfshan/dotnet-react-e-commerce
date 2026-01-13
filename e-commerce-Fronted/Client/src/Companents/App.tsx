import { useEffect } from "react";

import { Container, CssBaseline } from "@mui/material";
import Header from "./Header/Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useCart } from "../Context/CartContext";

export default function App() {
  const { refreshCart } = useCart();

  useEffect(() => {
    refreshCart();   // 🔥 uygulama açılır açılmaz sepeti yükle
  }, []);

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
      <CssBaseline />
      <Header favoriteCount={0} />
      <Container sx={{ minHeight: '80vh', pb: 5 }}>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}
