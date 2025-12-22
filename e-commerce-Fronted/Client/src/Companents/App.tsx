import { Container, CssBaseline } from "@mui/material";
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <>
      <CssBaseline />
      <Header favoriteCount={0} />

      <Container>
        <Outlet />
      </Container>
    </>
  );
}
