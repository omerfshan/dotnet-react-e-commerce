import { Card } from "@mui/material";
import { useNavigate } from "react-router-dom";

import ProductActions from "./_ProductActions";
import ProductImage from "./_ProductImage";
import ProductInfo from "./_ProductInfo";
import type { IProduct } from "../../Model/IProduct";

type Props = {
  product: IProduct;
  onFavorite: () => void;
};

export default function ProductCard({ product, onFavorite }: Props) {
  const navigate = useNavigate();

  if (!product.isActive) return null;

  return (
    <Card
      onClick={() => navigate(`/catalog/${product.id}`)}
      sx={{
        width: 230,
        borderRadius: 2,
        position: "relative",
        bgcolor: "#fff",
        cursor: "pointer",
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
        transition: "0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
        },
      }}
    >
      {/* ⚠️ FAVORI BUTONU TIKLANINCA SAYFAYA GİTMESİN */}
      <div onClick={(e) => e.stopPropagation()}>
        <ProductActions onFavorite={onFavorite} />
      </div>

      <ProductImage imageUrl={product.imageUrl} name={product.name} />
      <ProductInfo name={product.name} price={product.price} />
    </Card>
  );
}
