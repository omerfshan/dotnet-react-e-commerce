import { useEffect } from "react";
import { Container, CssBaseline } from "@mui/material";
import Header from "./Header/Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { fetchCart } from "../store/Slices/cartSlice"; 
import { useAppDispatch } from "../store/ hooks";


export default function App() {
  const dispatch = useAppDispatch(); 

  useEffect(() => {
    dispatch(fetchCart()); 
  }, []);

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