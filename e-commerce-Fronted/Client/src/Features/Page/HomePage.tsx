import { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/ hooks";
import { fetchProducts, selectAllProducts } from "../../store/Slices/productsSlice";
import ProductList from "../../Layout/ProductList";



export default function HomePage() {
  const dispatch = useAppDispatch();
  
  // ✅ Adapter selector'ları kullan
  const products = useAppSelector(selectAllProducts);
  const status = useAppSelector((state) => state.products.status);

 useEffect(() => {
  dispatch(fetchProducts()); // loaded=true ise slice zaten API'ye gitmiyor
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