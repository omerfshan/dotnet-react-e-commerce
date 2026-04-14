import { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/ hooks";
import { fetchProducts } from "../store/Products/productsSlice";
import ProductList from "../Companents/ProductList";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { products, status } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <Box sx={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return <ProductList products={products} />;
}