
import { Card } from "@mui/material";

import ProductActions from "./_ProductActions";
import ProductImage from "./_ProductImage";
import ProductInfo from "./_ProductInfo";
import type { IProduct } from "../../Model/IProduct";

type Props = {
  product: IProduct;
  onFavorite: () => void; // ✅ EKLENDİ
};


export default function ProductCard({ product, onFavorite }: Props) {

  if (!product.isActive) return null;

  return (
    <Card
      sx={{
        width: 230,
        borderRadius: 2,
        position: "relative",
        bgcolor: "#fff",
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
        transition: "0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
        },
      }}
    >
      <ProductActions onFavorite={onFavorite} />

      <ProductImage
        imageUrl={product.imageUrl}
        name={product.name}
      />
      <ProductInfo
        name={product.name}
        price={product.price}
      />
    </Card>
  );
}
