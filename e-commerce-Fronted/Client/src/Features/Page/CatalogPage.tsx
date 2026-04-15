import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/ hooks";
import { fetchProducts, fetchProductsByCategory } from "./ProductCard/productsSlice";
import ProductList from "../Layout/ProductList";

export default function CatalogPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { products, status } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductsByCategory(Number(id)));
    } else {
      dispatch(fetchProducts());
    }
  }, [id, dispatch]);

  if (status === "loading") {
    return (
      <Box sx={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return <ProductList products={products} />;
}