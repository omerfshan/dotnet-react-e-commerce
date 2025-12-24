import { Container, CssBaseline } from "@mui/material";
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
export default function App() {
  return (
    <>
       <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
      <CssBaseline />
      <Header favoriteCount={0} />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}
