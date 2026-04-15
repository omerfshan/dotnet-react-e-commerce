import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/ hooks";
import { fetchProducts, fetchProductsByCategory, selectAllProducts } from "../../store/Slices/productsSlice";
import ProductList from "../../Layout/ProductList";

export default function CatalogPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  // ✅ Adapter selector'ları
  const products = useAppSelector(selectAllProducts);
  const status = useAppSelector((state) => state.products.status);

 useEffect(() => {
  if (id) {
    dispatch(fetchProductsByCategory(Number(id))); // her zaman fetch
  } else {
    dispatch(fetchProducts()); // loaded=true ise cache'den
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