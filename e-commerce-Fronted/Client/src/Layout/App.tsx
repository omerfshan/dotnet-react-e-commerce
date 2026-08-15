import { useEffect } from "react";
import { Container, CssBaseline } from "@mui/material";
import Header from "./Header/Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { fetchCart } from "../store/Slices/cartSlice"; 
import { fetchFavorites } from "../store/Slices/favoriteSlice";
import { useAppDispatch, useAppSelector } from "../store/ hooks";


export default function App() {
  const dispatch = useAppDispatch(); 
  const user = useAppSelector((state) => state.account.user);

  useEffect(() => {
    dispatch(fetchCart());
    if (user) {
      dispatch(fetchFavorites());
    } else {
      // Misafir moddaysa yerel favorileri sıfırlama ama DB çekimi yapma
    }
  }, [user, dispatch]);

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header favoriteCount={0} />
      <Container sx={{ minHeight: "80vh", pb: 5 }}>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}